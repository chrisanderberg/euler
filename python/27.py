#!/usr/bin/env python3

import primes


def countConsecutivePrimes(a, b):
    n = 0
    while primes.isPrime((n * n) + (a * n) + b):
        n += 1
    return n


prod = 0
maxConsecutive = 0
for a in range(-999, 1000):
    for b in range(-999, 1000):
        consecutive = countConsecutivePrimes(a, b)
        if consecutive > maxConsecutive:
            maxConsecutive = consecutive
            prod = a * b
print(prod)
