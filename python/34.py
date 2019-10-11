#!/usr/bin/env python3

import digits


def isCurious(n):
    factorial = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880]
    s = 0
    for digit in digits.digitize(n):
        s += factorial[digit]
    return s == n


s = 0
for i in range(3, 10000000):
    if i % 500000 == 0:
        pass
    if isCurious(i):
        s += i
print(s)
