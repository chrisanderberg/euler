#!/usr/bin/env python3

"""
https://projecteuler.net/problem=10

The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.

Find the sum of all the primes below two million.
"""

import primes

sum = 0
for i in range(0, 2000000):
    if primes.isPrime(i):
        sum += i
print(sum)
