from django.shortcuts import render

# Create your views here.

def tanchishe(request):
    return render(request, "game/tanchishe.html")


def duobilizi(request):
    return render(request, "game/duobilizi.html")

def aircraftwars(request):
    return render(request, "game/aircraftwars.html")

def saolei(request):
    return render(request, "game/saolei.html")


