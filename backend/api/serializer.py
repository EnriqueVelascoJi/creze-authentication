import pyotp
import qrcode
from io import BytesIO
from datetime import datetime, timezone


from api.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers, exceptions
from django.core.files.base import ContentFile
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.utils.crypto import get_random_string
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.hashers import make_password, check_password
from rest_framework_simplejwt.tokens import RefreshToken




class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'qr_code']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'password2', 'qr_code', 'id']

    def validate(self, attrs: dict):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        email=validated_data['email']
        username=validated_data['username']
        otp_base32=pyotp.random_base32()
        otp_auth_url=pyotp.totp.TOTP(otp_base32).provisioning_uri(
            name=email.lower(), issuer_name="Creze"
        )
        stream = BytesIO()
        image = qrcode.make(f"{otp_auth_url}")
        image.save(stream)
        user = User.objects.create(
            username=username,
            email=email,
            otp_base32=otp_base32,
            otpauth_url=otp_auth_url
        )
        user.set_password(validated_data['password'])
        user.qr_code = ContentFile(
            stream.getvalue(), name=f"qr{get_random_string(10)}.png"
        )
        user.save()

        return user
    
class LoginSerialiazer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    class Meta:
        model = User
        fields = ['email',  'password',]

    def validate(self, attrs: dict):
        email=attrs['email']
        password=attrs['password']
        print(attrs, 'attrs')
        user = authenticate(
            request=self.context["request"],
            email=email,
            password=password
        )
        if user is None:
            raise exceptions.AuthenticationFailed("Invalid login details.")
        else:
            return attrs

    def create(self, validated_data):
        email = validated_data['email']
        user = User.objects.get(email=email)
        totp = pyotp.TOTP(user.otp_base32).now()
        user.login_otp = make_password(totp)
        user.otp_created_at = datetime.now(timezone.utc)
        user.login_otp_used = False
        user.save()
        return user
    

class VerifyOTPSerializer(serializers.Serializer):
    otp = serializers.CharField()
    id = serializers.IntegerField()


    def validate(self, attrs):
        id = attrs['id']
        user= User.objects.get(id=id)
        print(user)
        
        if not user:
            raise exceptions.AuthenticationFailed("Authentication Failed.")
        
        if (
            not user.is_valid_otp()
        ):
            raise exceptions.AuthenticationFailed("Authentication Failed.")
        return attrs

    def create(self, validated_data):
        id = validated_data['id']
        user = User.objects.get(id=id)
        refresh = RefreshToken.for_user(user)
        user.login_otp_used = True
        user.save()
        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }
