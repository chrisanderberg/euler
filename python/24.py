#!/usr/bin/env python3


def factorial(n):
    fact = 1

    if n > 1:
        for i in range(1, n + 1):
            fact *= i

    return fact


def getNthPerm(symbols, n):
    if symbols:
        permsPerSymbol = factorial(len(symbols) - 1)
        symbol = n // permsPerSymbol
        return [symbols[symbol]] + getNthPerm(symbols[:symbol] + symbols[symbol + 1:], n - permsPerSymbol * symbol)
    else:
        return []


perm = getNthPerm([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 1000001)
num = 0

for digit in perm:
    num *= 10
    num += digit

print(num)
