from django import forms
from django.forms.widgets import TextInput, Textarea
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
            'tag_color',
            'content',
        )
        labels = {
            'tag': '태그',
            'tag_color': '태그 색상',
            'content': '내용',
        }

        widgets = {
            'tag_color': TextInput(attrs={'type': 'color', 'value': '#FFFFFF', 'id': 'input-color'}),
            'tag': TextInput(attrs={'placeholder': '태그 생성', 'id': 'input-tag'}),
            'content': Textarea(attrs={'required': 'true'}),
        }
