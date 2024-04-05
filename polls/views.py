from django.shortcuts import render
from django.http import JsonResponse


# Create your views here.
def index(request):
    return JsonResponse(
        [
            {
                "question_text": "Hello, world. You're at the polls index.",
                "choices": [
                    {"id": "1", "choice_text": "Hello", "votes": 0},
                    {"id": "2", "choice_text": "World", "votes": 0},
                ],
            }
        ],
        safe=False,
    )
