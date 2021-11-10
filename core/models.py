from django.db import models


class TimeStampedModel(models.Model):
    """
    Db에서 공통적으로 사용하는 
    생성일자, 수정일자 컬럼
    """

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
