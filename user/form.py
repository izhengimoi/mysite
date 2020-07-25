from django import forms
from django.contrib import auth
from django.contrib.auth.models import User

class LoginForm(forms.Form):
    username = forms.CharField(
        label = '', 
        widget = forms.TextInput(
            attrs={'class':'form-control', 'placeholder':'请输入用户名'}
            )
        )
    password = forms.CharField(
        label = '',
        widget = forms.PasswordInput(
            attrs={'class':'form-control', 'placeholder':'请输入密码'}
            )
        )

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
    username = forms.CharField(
        label = '', 
        max_length = 10,
        min_length = 3,
        widget = forms.TextInput(
            attrs={'class':'form-control', 'placeholder':'请输入用户名'}
            )
        )
    password = forms.CharField(
        label = '',
        min_length = 6,
        widget = forms.PasswordInput(
            attrs={'class':'form-control', 'placeholder':'请输入密码'}
            )
        )
    password_again = forms.CharField(
        label = '',
        widget = forms.PasswordInput(
            attrs={'class':'form-control', 'placeholder':'请在输入一次密码'}
            )
        )
    def clean(self):
        username = self.cleaned_data['username']
        password = self.cleaned_data['password']
        password_again = self.cleaned_data['password_again']

        if User.objects.filter(username = username).exists():
            raise forms.ValidationError("用户名已存在")
        else:
            self.cleaned_data['username'] = username

        if password != password_again:
            raise forms.ValidationError("两次输入的密码不一致")
        else:
            self.cleaned_data['password_again'] = password_again
        
        return self.cleaned_data

class ChangeNicknameForm(forms.Form):
    nickname_new = forms.CharField(
        label='新的昵称',
        max_length=20,
        widget=forms.TextInput(
            attrs={'class':'form-control', 'placeholder':'请输入新的昵称'}
        )
    )


    def __init__(self, *args, **kwargs):
        if 'user' in kwargs:
            self.user = kwargs.pop('user')
        super(ChangeNicknameForm, self).__init__(*args, **kwargs)

    def clean(self):
        if self.user.is_authenticated:
            self.cleaned_data['user'] = self.user
        else:
            raise forms.ValidationError('用户未登录！')
        return self.cleaned_data


class ChangeEmail(forms.Form):
    email_new = forms.CharField(
        label='新的邮箱',
        max_length=100,
        widget=forms.TextInput(
            attrs={'class':'form-control', 'placeholder':'请输入新的邮箱'}
        )
    )


    def __init__(self, *args, **kwargs):
        if 'user' in kwargs:
            self.user = kwargs.pop('user')
        super(ChangeEmail, self).__init__(*args, **kwargs)

    def clean(self):
        if self.user.is_authenticated:
            self.cleaned_data['user'] = self.user
        else:
            raise forms.ValidationError('用户未登录！')
        return self.cleaned_data



class ChangePassword(forms.Form):
    password_new = forms.CharField(
        label='',
        min_length = 6,
        widget=forms.PasswordInput(
            attrs={'class':'form-control', 'placeholder':'请输入新的密码'}
        )
    )

    password_again = forms.CharField(
        label = '',
        widget = forms.PasswordInput(
            attrs={'class':'form-control', 'placeholder':'请在输入一次密码'}
            )
        )


    def __init__(self, *args, **kwargs):
        if 'user' in kwargs:
            self.user = kwargs.pop('user')
        super(ChangePassword, self).__init__(*args, **kwargs)

    def clean(self):
        password_new = self.cleaned_data['password_new']
        password_again = self.cleaned_data['password_again']
        if self.user.is_authenticated:
            self.cleaned_data['user'] = self.user
        else:
            raise forms.ValidationError('用户未登录！')

        if password_new != password_again:
            raise forms.ValidationError("两次输入的密码不一致")
        else:
            self.cleaned_data['password_new'] = password_again
        

        return self.cleaned_data

    
        
        

