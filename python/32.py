#!/usr/bin/env python3

import digits


def splitter(determinedSymbols):
    for multiplicandLength in range(1, len(determinedSymbols) - 1):
        for multiplierLength in range(1, len(determinedSymbols) - multiplicandLength):
            multiplicand = digits.digitsToNum(determinedSymbols[:multiplicandLength])
            multiplier = digits.digitsToNum(
                determinedSymbols[multiplicandLength:multiplicandLength + multiplierLength])
            product = digits.digitsToNum(
                determinedSymbols[multiplicandLength + multiplierLength:])
            if multiplicand * multiplier == product:
                if product not in products:
                    products.add(product)


def permutator(determinedSymbols, remainingSymbols):
    if remainingSymbols:
        for i in range(0, len(remainingSymbols)):
            symbol = remainingSymbols[i]
            permutator(determinedSymbols +
                       [symbol], remainingSymbols[:i] +
                       remainingSymbols[i + 1:])
    else:
        splitter(determinedSymbols)


products = set()
permutator([], [1, 2, 3, 4, 5, 6, 7, 8, 9])
s = 0
for product in products:
    s += product
print(s)
