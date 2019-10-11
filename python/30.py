#!/usr/bin/env python3

import digits


def sumExponentsOfDigits(n, e):
    s = 0
    for digit in digits.digitize(n):
        s += digit**e
    return s


s = 0
for i in range(10, 1000000):
    if sumExponentsOfDigits(i, 5) == i:
        s += i
print(s)
