#!/usr/bin/env python3


def digitize(n):
    digits = []

    while n > 0:
        digits.append(n % 10)
        n //= 10

    return digits


def sumExponentsOfDigits(n, e):
    digits = digitize(n)
    s = 0

    for digit in digits:
        s += digit ** e

    return s


s = 0

for i in range(10, 1000000):
    if sumExponentsOfDigits(i, 5) == i:
        s += i

print(s)
