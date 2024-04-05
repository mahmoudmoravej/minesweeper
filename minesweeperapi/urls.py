from django.urls import path

from . import apis

urlpatterns = [
    path("game/new", apis.newGame),
    path("game/<int:id>", apis.getGame),
    path("game/<int:id>/play/<int:row>/<int:col>/<str:action>", apis.play),
    path("game/leaderboard", apis.getLeaderboard),
]
