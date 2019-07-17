#!/usr/bin/env python3

"""
https://projecteuler.net/problem=10

The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.

Find the sum of all the primes below two million.
"""


def isPrime(primes, n):
    i = 0
    curPrime = primes[i]
    isPrime = True
    while isPrime and (curPrime**2 <= n):
        isPrime = (n % curPrime != 0)
        i += 1
        curPrime = primes[i]
    return isPrime


def appendNextPrime(primes):
    size = len(primes)
    n = primes[size-1] + 2
    while not isPrime(primes, n):
        n += 1
    primes.append(n)


primes = [2, 3]
i = 0
s = 0
while primes[i] < 2000000:
    s += primes[i]
    appendNextPrime(primes)
    i += 1
print(s)
