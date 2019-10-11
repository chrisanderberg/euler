#!/usr/bin/env python3

"""
https://projecteuler.net/problem=3

The prime factors of 13195 are 5, 7, 13 and 29.

What is the largest prime factor of the number 600851475143?
"""

import primes

exponents = primes.primeFactor(600851475143)
largestFactor = primes.getPrime(len(exponents)-1)
print(largestFactor)
