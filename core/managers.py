from django.db import models


class CustomBoardManager(models.Manager):
    """ 공통 함수 """

    def get_or_none(self, **kwargs):
        try:
            return self.get(**kwargs)
        except self.model.DoesNotExist:
            return None
