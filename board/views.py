import json
from datetime import datetime
from django.shortcuts import redirect, reverse
from django.views.generic import ListView, CreateView
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse
from .models import Board
from .forms import BoardModelForm


class BoardListView(ListView):
    """
    생성일자 순으로 to do 목록 조회
    """

    context_object_name = "boards"
    paginate_by = 10

    def get_queryset(self):
        return Board.objects.order_by("-created", "tag", "content")


def delete_board(self, board_pk=None):
    """
    선택한 to do 행 삭제
    """
    board = Board.objects.get(pk=board_pk)
    board.delete()
    return redirect(reverse("boards:board-list"))


class BoardCreateView(CreateView):
    model = Board
    form_class = BoardModelForm
    template_name = "board/board_carete.html"

    def get_success_url(self):
        return reverse("boards:board-list")


@require_http_methods(["PUT"])
def edit_board(request):
    """
    내용, 태그, 토글 수정
    """

    data = json.loads(request.body.decode("utf-8"))
    board = Board.objects.get_or_none(pk=data.get("pk"))

    if board is not None:
        if data.get("tag"):
            """ 태그 수정 """
            board.tag = data.get("tag")
            board.save()

        if data.get("content"):
            """ 내용 수정 """
            board.content = data.get("content")
            board.save()

        if data.get("toggleValue"):
            """ 토글 수정 """
            toggle = data.get("toggleValue")
            if toggle == "True":
                board.complete_yn = False
                board.complete_date = None
                board.save()
            else:
                board.complete_yn = True
                board.complete_date = datetime.now()
                board.save()

        return HttpResponse()
    else:
        return HttpResponse(status=400)
