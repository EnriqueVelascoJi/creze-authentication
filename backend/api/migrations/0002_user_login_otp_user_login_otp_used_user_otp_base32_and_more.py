# Generated by Django 4.2.17 on 2025-01-08 10:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='login_otp',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='login_otp_used',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='user',
            name='otp_base32',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='otp_created_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='otpauth_url',
            field=models.CharField(blank=True, max_length=225, null=True),
        ),
        migrations.DeleteModel(
            name='Profile',
        ),
    ]
