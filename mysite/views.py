from django.shortcuts import render, redirect
from django.contrib.contenttypes.models import ContentType
from django.urls import reverse
from counter.utils import get_sevendays_readnum
from blog.models import Blog



def home(request):
    blog_content_type = ContentType.objects.get_for_model(Blog)
    read_nums, dates = get_sevendays_readnum(blog_content_type)
    context = {}
    context['read_nums'] = read_nums
    context['dates'] = dates
    return render(request, "home.html", context)



