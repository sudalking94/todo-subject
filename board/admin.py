from django.contrib import admin
from . import models


@admin.register(models.Board)
class Board(admin.ModelAdmin):
    """ todo 게시판 admin 정의"""

    list_display = (
        '__str__',
        'complete_yn',
        'tag',
        'created',
        'updated',
    )

    list_filter = (
        "tag",
    )
