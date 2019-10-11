#!/usr/bin/env python3

import primes
import digits


def rotateNum(n):
    ds = digits.digitize(n)
    if len(ds) < 2:
        return n
    else:
        lastDigit = ds.pop()
        return digits.digitsToNum([lastDigit] + ds)


def isCircularPrime(n):
    result = True
    p = rotateNum(n)
    while p != n and result:
        result = primes.isPrime(p)
        p = rotateNum(p)
    return result


i = 0
count = 0
p = 2
while p < 1000000:
    if isCircularPrime(p):
        count += 1
    i += 1
    p = primes.getPrime(i)
print(count)
