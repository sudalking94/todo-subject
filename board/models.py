from django.db import models
from core import models as core_models


class Board(core_models.TimeStampedModel):
    """ todo 게시판 모델 """

    content = models.TextField()
    tag = models.CharField(max_length=20, blank=True)
    complete_yn = models.BooleanField()

    def get_content(self):
        result = self.content[:30]
        if len(result) == 30:
            result = result + "..."
        return result
