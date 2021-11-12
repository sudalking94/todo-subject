from django.db import models
from core import models as core_models
from core.managers import CustomBoardManager


class Board(core_models.TimeStampedModel):
    """ todo 게시판 모델 """

    content = models.TextField(null=False, blank=False)
    tag = models.CharField(max_length=20, blank=True)
    complete_yn = models.BooleanField()
    complete_date = models.DateTimeField(blank=True, null=True)
    tag_color = models.CharField(max_length=7, blank=True, null=True)

    objects = CustomBoardManager()

    def get_content(self):
        result = self.content[:10]
        if len(result) == 10:
            result = result + "..."
        return result
