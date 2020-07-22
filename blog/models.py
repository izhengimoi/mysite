from django.db import models
from django.contrib.auth.models import User
from ckeditor_uploader.fields import RichTextUploadingField
from counter.models import ReadNum, ReadNumJudge

class BlogType(models.Model):
    type_name = models.CharField(max_length=15)

    def __str__(self):
        return self.type_name

# Create your models here.
class Blog(models.Model, ReadNumJudge):
    title = models.CharField(max_length=30)
    blog_type = models.ForeignKey(BlogType, on_delete=models.DO_NOTHING)
    content = RichTextUploadingField()
    author = models.ForeignKey(User, on_delete=models.DO_NOTHING, default=1)
    create_time = models.DateTimeField(auto_now_add=True)
    last_updelete_time = models.DateTimeField(auto_now=True)
    is_delete = models.BooleanField(default=False)
    
    def __str__(self):
        return self.title
    class Meta:
        ordering = ['-create_time']
    
    
