from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class OAuthRelationship(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    openid = models.CharField(max_length=128)

    OAUTH_TYPE_CHOICES = (
        (0, "QQ"),
        (1, "WeChar"),
        (2, "SiNa"),
        (3, "GitHub"),
    )
    oauth_type = models.IntegerField(default=0, choices=OAUTH_TYPE_CHOICES)
    def __str__(self):
        return "<OAuthRelationship: %s>" % self.user.username

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nickname = models.CharField(max_length=20,verbose_name='昵称')


    def __str__(self):
        return '<Profile: %s for %s>' % (self.nickname, self.user.username)


def get_nickname_or_username(self):
    if Profile.objects.filter(user=self).exists():
        profile =  Profile.objects.get(user=self)
        return profile.nickname
    else:
        return self.username

User.get_nickname_or_username = get_nickname_or_username
