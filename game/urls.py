from django.urls import path
from . import views

urlpatterns = [
    path('tanchishe/', views.tanchishe, name="tanchishe"),
    path('duobilizi/', views.duobilizi, name="duobilizi"),
    path('aircraftwars/', views.aircraftwars, name="aircraftwars"),
    path('saolei/', views.saolei, name="saolei"),
]