import datetime, time
from django.contrib.contenttypes.models import ContentType
from django.db.models import Sum
from django.utils import timezone
from .models import ReadNum, Readday

def read_once(request, blog):
    ct = ContentType.objects.get_for_model(blog)
    key = "%s_%s_read" % (ct.model, blog.id)
    if not request.COOKIES.get(key):
        readnum, created = ReadNum.objects.get_or_create(content_type = ct, object_id = blog.id)
        readnum.read_num += 1
        readnum.save()

        date = timezone.now().date()
        readnum_day, created = Readday.objects.get_or_create(content_type = ct, object_id = blog.id, date = date)
        readnum_day.read_num += 1
        readnum_day.save()
    return key

def get_sevendays_readnum(content_type):
    today = timezone.now().date()

    read_nums = []
    dates = []
    for i in range(6, -1, -1):
        date = today - datetime.timedelta(days = i)
        read_day = Readday.objects.filter(content_type = content_type, date = date)
        result = read_day.aggregate(read_num_sum = Sum('read_num'))
        read_nums.append(result['read_num_sum'] or 0)
        dates.append(date.strftime('%m/%d'))
    return read_nums, dates
        
        

