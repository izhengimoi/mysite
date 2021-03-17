from django.shortcuts import render, get_object_or_404
from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.core.paginator import Paginator
from django.db.models import Count
from django.core.cache import cache

from .models import Blog, BlogType
from counter.utils import read_once
from comment.models import Comment, Like
from comment.form import CommentForm

# Create your views here.
def blog_get_paginator(request, blogs_all_list):
    context = {}
    paginator = Paginator(blogs_all_list, 5)
    page_num = request.GET.get('page', 1)
    page_of_blogs = paginator.get_page(page_num)
    curentr_page_num = page_of_blogs.number
    page_range = list(range(max(curentr_page_num-2, 1), curentr_page_num)) + \
                 list(range(curentr_page_num, min(curentr_page_num + 2, paginator.num_pages) + 1))
    if page_range[0] - 1 >= 2:
        page_range.insert(0, '...')
    if paginator.num_pages - page_range[-1] >= 2:
        page_range.append('...')
    if page_range[0] != 1:
        page_range.insert(0, 1)
    if page_range[-1] != paginator.num_pages:
        page_range.append(paginator.num_pages)
    blog_dates = Blog.objects.dates("create_time", "month", order="DESC")
    blog_types = BlogType.objects.all()
    blog_type_list = []
    for blog_type in blog_types:
        blog_type.blog_count = Blog.objects.filter(blog_type=blog_type, is_delete=False).count()
        blog_type_list.append(blog_type)
    blog_date_list = {}
    for blog_date in blog_dates:
        blog_count = Blog.objects.filter(create_time__year=blog_date.year,
                                         create_time__month = blog_date.month, is_delete=False).count()
        blog_date_list[blog_date] = blog_count   
    #缓存数据
    
    context["page_of_blogs"] = page_of_blogs
    context["blog_types"] = blog_types
    context["blogs"] = page_of_blogs.object_list
    context["page_range"] = page_range
    context["blog_dates"] = blog_date_list
    return context

def blog_list(request):

    blogs_all_list = Blog.objects.filter(is_delete=False)
    context = blog_get_paginator(request, blogs_all_list)
    
    return render(request, "blog/blog_list.html", context)

def blog_datell(request, blog_id):
    blog = get_object_or_404(Blog, id=blog_id)
    read_cookie_key = read_once(request, blog) 
    blog_content_type = ContentType.objects.get_for_model(blog)
    comments = Comment.objects.filter(content_type = blog_content_type, object_id = blog.id)
    likes = Like.objects.filter(content_type = blog_content_type, object_id = blog.id)
    pervious_blog = Blog.objects.filter(last_updelete_time__gt = blog.last_updelete_time, is_delete=False).last()
    next_blog = Blog.objects.filter(last_updelete_time__lt = blog.last_updelete_time, is_delete=False).first()
    comment_form = CommentForm(initial = {'content_type': blog_content_type.model, 'object_id': blog_id})
    context = {"blog": blog, "pervious_blog": pervious_blog, "next_blog": next_blog, "comments": comments, "likes": likes, 'comment_form': comment_form,}
    response = render(request, "blog/blog_datell.html", context)
    response.set_cookie(read_cookie_key, 'ture')
    return response

def blog_with_type(request, blog_type_id):
    type_name = get_object_or_404(BlogType, id=blog_type_id)
    blogs_all_list = Blog.objects.filter(blog_type=type_name, is_delete=False)
    context = blog_get_paginator(request, blogs_all_list)
    context["type_name"] = type_name
    return render(request, "blog/blog_with_type.html", context)

def blog_with_date(request, year, month):
    blogs_all_list = Blog.objects.filter(create_time__year=year, create_time__month = month, is_delete=False)
    blog_with_data = "%s年%s月" % (year, month)
    context = blog_get_paginator(request, blogs_all_list)
    context["blog_with_data"] = blog_with_data
    return render(request, "blog/blog_with_date.html", context)


    
