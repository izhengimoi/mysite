from django.contrib import admin
from .models import Comment,Like
# Register your models here.
@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('content_object', 'text', 'comment_time', 'user')

@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ('content_object', 'like_time', 'user')

