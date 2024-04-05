from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
import json

import random

bombs_percentage = 10

games = []


def createGame(rows, cols, player):
    board = createGameBoard(rows, cols)

    game = {
        "id": len(games) + 1,
        "player": player if player else "Anonymous",
        "cells": board["cells"],
        "bombsCount": board["bombsCount"],
        "result": "active",
        "score": 0,
    }
    games.append(game)

    return game


def getGame(id):
    game = games[id - 1]

    return gaurdGameData(game)


def play(id, row, col, action):
    game = games[id - 1]

    lastActionResult = doAction(row, col, action, game["cells"])

    calculateGameStatus(game, lastActionResult)

    return gaurdGameData(game)


def buildLeaderBoard():
    result = {}

    for game in games:
        if game["result"] == "active":
            continue

        won = game["result"] == "won"

        if game["player"] in result:
            record = result[game["player"]]
        else:
            record = result[game["player"]] = {
                "name": game["player"],
                "score": 0,
                "won": 0,
                "lost": 0,
                "played": 0,
            }

        record.update(
            {
                "score": record["score"] + game["score"],
                "won": record["won"] + 1 if won else 0,
                "lost": record["lost"] + 0 if won else 1,
                "played": record["played"] + 1,
            }
        )

    # map the result to a ordered list
    result = sorted(result.values(), key=lambda record: record["score"], reverse=True)

    return result


def gaurdGameData(game):
    if game["result"] != "active":
        return game

    return hideNotRevealedCells(game)


def hideNotRevealedCells(game):
    safeGame = game.copy()
    safeGame["cells"] = []

    for row in game["cells"]:
        safeRow = []
        for cell in row:
            safeCell = cell.copy()

            safeCell.pop("hasBomb")
            if safeCell["result"] != "cleared":
                safeCell.pop("result")
                safeCell.pop("value")

            safeRow.append(safeCell)
        safeGame["cells"].append(safeRow)

    return safeGame


def calculateGameStatus(game, lastActionResult):
    if lastActionResult == "blasted":
        game["result"] = "lost"
    else:
        checkIfWon(game)

    calculateScore(game)


def calculateScore(game):
    score = 0
    rightFlags = 0
    wrongFlags = 0

    if game["result"] == "won":
        score = game["bombsCount"] * 10 + game["bombsCount"]

    elif game["result"] == "lost":
        for row in game["cells"]:
            for cell in row:
                if cell["result"] == "rightFlag":
                    rightFlags += 1
                elif cell["result"] == "wrongFlag":
                    wrongFlags += 1

        score = max(rightFlags - wrongFlags, 0)

    game["score"] = score


def checkIfWon(game):
    rightFlags = 0
    wrongFlags = 0
    notPlayed = 0

    for row in game["cells"]:
        for cell in row:
            if cell["result"] == "rightFlag":
                rightFlags += 1
            elif cell["result"] == "wrongFlag":
                wrongFlags += 1
            elif cell["result"] == "notPlayed":
                notPlayed += 1

            if notPlayed > 0 or wrongFlags > 0:
                break

    if rightFlags == game["bombsCount"] and notPlayed == 0 and wrongFlags == 0:
        game["result"] = "won"


def createGameBoard(rowsCount, colsCount):
    cells = createGameCells(rowsCount, colsCount)

    bombsCount = mineBobs(cells)

    calculateAndFillValues(cells)

    return {"cells": cells, "bombsCount": bombsCount}


def doAction(row, col, action, cells):
    cell = cells[row][col]
    if action == "flag":
        cell["action"] = "flagged"
    elif action == "unflag":
        cell["action"] = "notPlayed"
    elif action == "sweep":
        cell["action"] = "sweeped"

    calculateCellResult(cell)

    if isActionEligibleToSpread(action, cell):
        cleanAdjacentCells(row, col, cells)

    return cell["result"]


def isActionEligibleToSpread(action, cell):
    return action == "sweep" and cell["result"] == "cleared" and isEmptyCell(cell)


def isEmptyCell(cell):
    return cell["value"] == 0 and cell["hasBomb"] == False


def notAlreadyCleared(cell):
    return cell["result"] != "cleared"


def cleanAdjacentCells(row, col, cells):
    for i in range(row - 1, row + 2):
        for j in range(col - 1, col + 2):
            if i < 0 or i >= len(cells) or j < 0 or j >= len(cells[0]):
                continue

            if i == row and j == col:
                continue

            cell = cells[i][j]
            if cell["hasBomb"] == False and notAlreadyCleared(cell):
                doAction(i, j, "sweep", cells)


def calculateCellResult(cell):
    action = cell["action"]
    hasBomb = cell["hasBomb"]
    result = "notPlayed"

    if action == "flagged":
        if hasBomb:
            result = "rightFlag"
        else:
            result = "wrongFlag"
    elif action == "sweeped":
        if hasBomb:
            result = "blasted"
        else:
            result = "cleared"

    cell["result"] = result


def calculateAndFillValues(cells):
    for row in range(len(cells)):
        for col in range(len(cells[0])):
            if cells[row][col]["hasBomb"]:
                continue

            cells[row][col]["value"] = countBombsAround(cells, row, col)


def countBombsAround(cells, row, col):
    count = 0

    for i in range(row - 1, row + 2):
        for j in range(col - 1, col + 2):
            if i < 0 or i >= len(cells) or j < 0 or j >= len(cells[0]):
                continue

            if i == row and j == col:
                continue

            if cells[i][j]["hasBomb"]:
                count += 1

    return count


def createGameCells(rowsCount, colsCount):

    cells = []

    for row in range(rowsCount):
        row_cells = []
        for col in range(colsCount):
            row_cells.append(
                {
                    "hasBomb": False,
                    "action": "notPlayed",
                    "result": "notPlayed",
                    "value": 0,
                }
            )
        cells.append(row_cells)

    return cells


def mineBobs(cells):
    bombs = pickRandomCells(len(cells), len(cells[0]))

    for bomb in bombs:
        cells[bomb["row"]][bomb["col"]]["hasBomb"] = True

    return len(bombs)


def pickRandomCells(rows, cols):
    cells = []
    for no in pickSampleNumbers(rows * cols, bombs_percentage):
        cells.append({"row": no // cols, "col": no % cols})

    return cells


def pickSampleNumbers(size, percentage):
    return random.sample(range(size), (size * percentage // 100))
