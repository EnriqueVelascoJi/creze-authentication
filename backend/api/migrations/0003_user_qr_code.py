# Generated by Django 4.2.17 on 2025-01-08 10:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_user_login_otp_user_login_otp_used_user_otp_base32_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='qr_code',
            field=models.ImageField(blank=True, null=True, upload_to='qrcode/'),
        ),
    ]