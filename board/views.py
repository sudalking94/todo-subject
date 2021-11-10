import json
from django.shortcuts import redirect, render, reverse
from django.views.generic import ListView
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from .models import Board


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


@csrf_exempt
@require_http_methods(["PUT"])
def edit_board(request):
    """
    내용 및 태그 수정
    """
    print("="*50)
    data = json.loads(request.body.decode("utf-8"))
    if data.get("tag"):
        """ 태그 수정 """
        board = Board.objects.get(pk=data.get("pk"))
        board.tag = data.get("tag")
        board.save()

    if data.get("content"):
        """ 내용 수정 """
        board = Board.objects.get(pk=data.get("pk"))
        board.content = data.get("content")
        board.save()

    return render(request, 'board/board_list.html')
