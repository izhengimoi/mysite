from django.shortcuts import render, redirect
from django.contrib.contenttypes.models import ContentType
from django.urls import reverse
from django.http import JsonResponse
from .models import Comment,Like
from .form import CommentForm
from user.models import Profile
import datetime
# Create your views here.
def update_comment(request):
    
    referer = request.META.get('HTTP_REFERER', reverse('home'))
    comment_form = CommentForm(request.POST, user = request.user)
    data = {}
    if comment_form.is_valid():
        comment = Comment()
        comment.user = comment_form.cleaned_data['user']
        comment.text = comment_form.cleaned_data['text']
        comment.content_object = comment_form.cleaned_data['content_object']
        comment.save()
        if Profile.objects.filter(user=request.user).exists():
            profile =  Profile.objects.get(user=request.user)
            username = profile.nickname
        else:
            username = request.user.username
        data['status'] = 'SUCCESS'
        data['username'] = username
        datetime.datetime.now()
        data['comment_time'] = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        print(data['comment_time'])
        data['text'] = comment.text
        data['comment_number'] = Comment.objects.filter(content_type = comment.content_type, object_id = comment.object_id).count()
          
        #return redirect(referer)
    else:
        data['status'] = 'ERROR'
        #return render(request, 'error.html', {'message':comment_form.errors, 'redirect_to': referer})
    return JsonResponse(data)

def update_like(request):
    
    content_type = request.POST.get('content_type','')
    object_id = int(request.POST.get('object_id',''))
    model_class = ContentType.objects.get(model = content_type).model_class()
    model_obj = model_class.objects.get(id = object_id)
    data = {}
    like = Like()
    like.user = request.user
    like.content_object = model_obj
    like.object_id = object_id
    like.save()
    if Profile.objects.filter(user=request.user).exists():
        profile =  Profile.objects.get(user=request.user)
        username = profile.nickname
    else:
        username = request.user.username
    data['username'] = username
    data['like_time'] = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    data['like_number'] = Like.objects.filter(content_type = like.content_type, object_id = like.object_id).count()
    return JsonResponse(data)