#!/usr/bin/env python3

import digits

resultFound = False


def calcNum(i, n):
    ds = []
    for j in range(1, n + 1):
        ds = ds + digits.digitize(i * j)
    return digits.digitsToNum(ds)


def checkNum(num):
    for n in range(9, 1, -1):
        maxi = 1
        mini = 1
        maxnum = 0
        while maxnum < num:
            maxi *= 2
            maxnum = calcNum(maxi, n)
        minnum = calcNum(mini, n)
        oldmin = 0
        oldmax = 0
        while (minnum < num and maxnum > num) and (minnum != maxnum) and not (oldmin == minnum and oldmax == maxnum):
            oldmin = minnum
            oldmax = maxnum
            midi = (mini + maxi) // 2
            midnum = calcNum(midi, n)
            if midnum > num:
                maxnum = midnum
                maxi = midi
            else:
                minnum = midnum
                mini = midi
        if minnum == num or maxnum == num:
            return True
    return False


def permutator(determinedSymbols, remainingSymbols):
    global resultFound
    if resultFound:
        return
    if remainingSymbols:
        for i in range(0, len(remainingSymbols)):
            if resultFound:
                return
            symbol = remainingSymbols[i]
            permutator(determinedSymbols +
                       [symbol], remainingSymbols[:i] + remainingSymbols[i + 1:])
    else:
        num = digits.digitsToNum(determinedSymbols)
        if checkNum(num):
            print(num)
            resultFound = True


permutator([], [9, 8, 7, 6, 5, 4, 3, 2, 1])
