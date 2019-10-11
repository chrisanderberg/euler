#!/usr/bin/env python3

import primes
import digits


def isLeftTruncatable(p):
    if p in [2, 3, 5, 7]:
        return True
    if primes.isPrime(p):
        return isLeftTruncatable(digits.digitsToNum(digits.digitize(p)[1:]))
    return False


def isRightTruncatable(p):
    if p in [2, 3, 5, 7]:
        return True
    if primes.isPrime(p):
        ds = digits.digitize(p)
        return isRightTruncatable(digits.digitsToNum(ds[:len(ds) - 1]))
    return False


def isTruncatable(p):
    return isRightTruncatable(p) and isLeftTruncatable(p)


i = 4
count = 0
s = 0
while count < 11:
    p = primes.getPrime(i)
    if isTruncatable(p):
        count += 1
        s += p
    i += 1
print(s)
