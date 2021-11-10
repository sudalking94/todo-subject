from django.shortcuts import redirect, reverse
from django.views.generic import ListView
from .models import Board


class BoardListView(ListView):

    context_object_name = "boards"
    paginate_by = 10

    def get_queryset(self):
        return Board.objects.order_by("-created", "tag", "content")


def delete_board(self, board_pk=None):
    print("="*50)
    print(board_pk)
    board = Board.objects.get(pk=board_pk)

    board.delete()
    return redirect(reverse("boards:board-list"))
