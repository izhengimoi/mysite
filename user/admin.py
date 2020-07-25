from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmdin
from django.contrib.auth.models import User
from .models import Profile, OAuthRelationship

# Register your models here.

@admin.register(OAuthRelationship)
class OAuthRelationshipAdmin(admin.ModelAdmin):
    list_display = ('user', 'oauth_type', 'openid')

class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False

class UserAdmin(BaseUserAdmdin):
    inlines = (ProfileInline, )
    list_display = ('username', 'nickname', 'email', 'is_staff', 'is_active', 'is_superuser')

    def nickname(self, obj):
        return obj.profile.nickname
    nickname.short_description = '昵称'

admin.site.unregister(User)
admin.site.register(User, UserAdmin)
