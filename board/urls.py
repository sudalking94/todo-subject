from django.urls import path
from .views import BoardListView

app_name = 'boards'

urlpatterns = [
    path('', BoardListView.as_view(), name='board-list'),
]
