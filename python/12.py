#!/usr/bin/env python3

import primes


def countDivisors(n):
    exponents = primes.primeFactor(n)
    divisors = 1
    for exponent in exponents:
        divisors *= exponent + 1
    return divisors


def triangularNumber(n):
    return ((n * n) + n) // 2


n = 0
while True:
    n += 1
    tn = triangularNumber(n)
    d = countDivisors(tn)
    if d > 500:
        break
print(triangularNumber(n))
