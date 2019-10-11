#!/usr/bin/env python3

import primes
import digits

resultFound = False


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
        if primes.isPrime(num):
            print(num)
            resultFound = True


for n in range(9, 0, -1):
    if resultFound:
        break
    symbols = []
    for symbol in range(n, 0, -1):
        symbols.append(symbol)
    permutator([], symbols)
