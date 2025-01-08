from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractUser
from datetime import datetime
from django.utils import timezone


class User(AbstractUser):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    otpauth_url = models.CharField(max_length=225, blank=True, null=True)
    otp_base32 = models.CharField(max_length=255, null=True)
    login_otp = models.CharField(max_length=255, null=True, blank=True)
    login_otp_used = models.BooleanField(default=True)
    otp_created_at = models.DateTimeField(blank=True, null=True)
    qr_code = models.ImageField(upload_to="qrcode/",blank=True, null=True)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def is_valid_otp(self):
        lifespan_in_seconds = 30
        now = datetime.now(timezone.utc)
        print(now, 'now', self.otp_created_at)
        time_diff = now - self.otp_created_at
        print(time_diff)
        time_diff = time_diff.total_seconds()
        print(time_diff)
        if time_diff >= lifespan_in_seconds or self.login_otp_used :
            return False
        return True

