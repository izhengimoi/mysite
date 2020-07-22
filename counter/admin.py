from django.contrib import admin
from .models import ReadNum, Readday
# Register your models here.
@admin.register(ReadNum)
class ReadNumAdmin(admin.ModelAdmin):
    list_display = ("read_num", "content_object", )

@admin.register(Readday)
class ReaddayAdmin(admin.ModelAdmin):
    list_display = ("date", "read_num", "content_object",)
