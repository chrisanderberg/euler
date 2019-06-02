#!/usr/bin/python


def digitize(n):
    digits = []
    while n > 0:
        digits.append(n % 10)
        n //= 10
    return digits


print(sum(digitize(2**1000)))
