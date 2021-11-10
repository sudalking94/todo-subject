from django.urls import path
from .views import BoardListView, delete_board, edit_board

app_name = 'boards'

urlpatterns = [
    path('', BoardListView.as_view(), name='board-list'),
    path('<int:board_pk>/delete/', delete_board, name="delete-board",),
    path('edit/', edit_board, name="edit-board",),
]
