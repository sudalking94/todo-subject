from django.shortcuts import render
from django.views.generic import ListView
from .models import Board


class BoardListView(ListView):
    model = Board

    context_object_name = "boards"
    paginate_by = 10
