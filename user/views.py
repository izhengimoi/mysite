from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import auth
from django.contrib.auth.models import User
from django.urls import reverse
from .form import LoginForm, RegForm, ChangeNicknameForm, ChangeEmail
from django.conf import settings
from urllib.request import urlopen
from urllib.parse import urlencode
from .models import Profile



def login_by_qq(request):
    code = request.GET['code']
    state = request.GET['state']
    if state != settings.QQ_STATE:
        raise Exception("state error")
    params = {
        'grant_type': 'authorization_code',
        'client_id': settings.QQ_APP_ID,
        'client_secret': settings.QQ_APP_KEY,
        'code': code,
        'redirect_uri': settings.QQ_REDIRECT_URL,
    }
    response = urlopen('https://graph.qq.com/oauth2.0/token?' + urlencode(params))
    data = response.read().decode('utf8')
    access_token = params_qs(data)['access_token'][0]


    response = urlopen('https://graph.qq.com/oauth2.0/me?access_token=' + access_token)
    data = response.read().decode('utf8')
    openid = json.loads(data[10:-4])['openid']
    
def login(request):
    if request.method == 'POST':
        login_form = LoginForm(request.POST)
        if login_form.is_valid():
            user = login_form.cleaned_data['user']
            auth.login(request, user)
            return redirect(request.GET.get('from', reverse('home')))
    else:
        login_form = LoginForm()
    context = {}
    context['login_form'] = login_form
    return render(request, "user/login.html", context) 

def logout(request):
    auth.logout(request)
    return redirect(request.GET.get('from', reverse('home')))

def register(request):
    if request.method == 'POST':
        reg_form = RegForm(request.POST)
        if reg_form.is_valid():
            username = reg_form.cleaned_data['username']
            password = reg_form.cleaned_data['password']
            email = ''
            user = User.objects.create_user(username, email,password)
            user.save()
            user = auth.authenticate(username = username, password = password)
            auth.login(request, user)
            return redirect(request.GET.get('from', reverse('home')))
    else:
        reg_form = RegForm()
    context = {}
    context['reg_form'] = reg_form
    return render(request, "user/register.html", context) 


def user_info(request):
    context = {}
    return render(request, "user/user_info.html", context) 

def change_nickname(request):
    redirect_to = request.GET.get('from', reverse('user_info'))

    if request.method == 'POST':
        form = ChangeNicknameForm(request.POST, user=request.user)
        if form.is_valid():
            nickname_new = form.cleaned_data['nickname_new']
            profile, created = Profile.objects.get_or_create(user=request.user)
            profile.nickname = nickname_new
            profile.save()
            return redirect(redirect_to)
    else:
        form = ChangeNicknameForm()

    context = {}
    context['page_title'] = '修改昵称'
    context['form_tile'] = '修改昵称'
    context['submit_text'] = '修改'
    context['form'] = form
    return render(request, 'user/form.html', context)


def change_email(request):
    redirect_to = request.GET.get('from', reverse('user_info'))

    if request.method == 'POST':
        form = ChangeEmail(request.POST, user=request.user)
        if form.is_valid():
            email_new = form.cleaned_data['email_new']
            user_email = User.objects.filter(user=request.user)
            user_email.email = email_new
            user_email.save()
            return redirect(redirect_to)
    else:
        form = ChangeEmail()

    context = {}
    context['page_title'] = '修改邮箱'
    context['form_tile'] = '修改邮箱'
    context['submit_text'] = '修改'
    context['form'] = form
    return render(request, 'user/form.html', context)

