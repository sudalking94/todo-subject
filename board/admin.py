from django.contrib import admin
from . import models


@admin.register(models.Board)
class Board(admin.ModelAdmin):
    """ todo 게시판 admin 정의"""

    list_display = (
        'content',
        'complete_yn',
        'complete_date',
        'tag',
        'created',
        'updated',
    )

    list_filter = (
        "tag",
    )
