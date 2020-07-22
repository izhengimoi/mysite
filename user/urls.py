from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from . import views
urlpatterns = [
    path('login/', views.login, name = 'login' ),
    path('logout/', views.logout, name = 'logout' ),
    path('register/', views.register, name = 'register' ),
    path('user_info/', views.user_info, name = 'user_info' ),
    path('login_by_qq', views.login_by_qq, name = 'login_by_qq' ),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
