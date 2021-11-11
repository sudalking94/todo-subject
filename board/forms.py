from django import forms
from .models import Board


class BoardModelForm(forms.ModelForm):

    def save(self, *args, **kwargs):
        board = super().save(commit=False)
        board.complete_yn = False
        board.save()

    class Meta:
        model = Board
        fields = (
            'tag',
            'content',
        )
