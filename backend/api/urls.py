from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import VerifyOTPView

urlpatterns = [
    path('login/', views.Login.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', views.CreateUserView.as_view(), name='auth_register'),
    path("verify-otp/", VerifyOTPView.as_view(), name="verify-otp"),
    path('test/', views.testEndPoint, name='test'),
    path('', views.getRoutes),
]