#!/usr/bin/env python3

import digits

fractionalPart = []
nextInt = 1


def getDigit(i):
    while len(fractionalPart) < i:
        appendNextInt()
    return fractionalPart[i - 1]


def appendNextInt():
    global nextInt, fractionalPart
    ds = digits.digitize(nextInt)
    nextInt += 1
    fractionalPart += ds


product = 1
for i in [1, 10, 100, 1000, 10000, 100000, 1000000]:
    product *= getDigit(i)
print(product)
