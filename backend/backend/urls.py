from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include("api.urls"))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
