from django import forms
from django.contrib import auth
from django.contrib.auth.models import User

class LoginForm(forms.Form):
    username = forms.CharField(label = '', 
                               widget = forms.TextInput(
                                   attrs={'class':'form-control', 'placeholder':'请输入用户名'}))
    password = forms.CharField(label = '',
                               widget = forms.PasswordInput(
                                   attrs={'class':'form-control', 'placeholder':'请输入密码'}))

    def clean(self):
        username = self.cleaned_data['username']
        password = self.cleaned_data['password']
        user = auth.authenticate(username = username, password = password)
        if user is None:
            raise forms.ValidationError('用户名或密码错误')
        else:
            self.cleaned_data['user'] = user
        return self.cleaned_data
        
class RegForm(forms.Form):
    username = forms.CharField(label = '', 
                               max_length = 10,
                               min_length = 3,
                               widget = forms.TextInput(
                                   attrs={'class':'form-control', 'placeholder':'请输入用户名'}))
    password = forms.CharField(label = '',
                               min_length = 6,
                               widget = forms.PasswordInput(
                                   attrs={'class':'form-control', 'placeholder':'请输入密码'}))
    password_again = forms.CharField(label = '',
                               widget = forms.PasswordInput(
                                   attrs={'class':'form-control', 'placeholder':'请在输入一次密码'}))
    def clean_username(self):
        username = self.cleaned_data['username']
        if User.objects.filter(username = username).exists():
            raise forms.ValidationError("用户名已存在")
        return username
    
    def clean_password_again(self):
        password = self.cleaned_data['password']
        password_again = self.cleaned_data['password_again']
        if password != password_again:
            raise forms.ValidationError("两次输入的密码不一致")
        return password_again


        
        

