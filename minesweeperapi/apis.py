from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
import json

import random
from . import gameEngine


@require_POST
@csrf_exempt
def newGame(request):
    data = json.loads(request.body)

    rows = int(data.get("rows", 10))
    cols = int(data.get("cols", 10))
    player = data.get("player", "Anonymous")

    return JsonResponse(gameEngine.createGame(rows, cols, player)["id"], safe=False)


def getGame(request, id):
    return JsonResponse(gameEngine.getGame(id), safe=False)


@require_POST
@csrf_exempt
def play(request, id, row, col, action):
    return JsonResponse(gameEngine.play(id, row, col, action), safe=False)


def getLeaderboard(request):
    return JsonResponse(gameEngine.buildLeaderBoard(), safe=False)
