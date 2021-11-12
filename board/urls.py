from django.urls import path
from .views import BoardListView, BoardCreateView, delete_board, delete_tag, edit_board, edit_tag, delete_tag

app_name = 'boards'

urlpatterns = [
    path('', BoardListView.as_view(), name='board-list'),
    path('<int:board_pk>/delete/', delete_board, name="delete-board",),
    path('edit/', edit_board, name="edit-board",),
    path('edit-tag/', edit_tag, name="edit-tag",),
    path('delete-tag/', delete_tag, name="delete-tag",),
    path('create/', BoardCreateView.as_view(), name="create-board",),
]
