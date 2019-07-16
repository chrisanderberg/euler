#!/usr/bin/env python3

"""https://projecteuler.net/problem=7

By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13,
we can see that the 6th prime is 13.

What is the 10 001st prime number?"""


def isPrime(primes, n):
    i = 0
    curPrime = primes[i]
    isPrime = True

    while isPrime and (curPrime * curPrime <= n):
        isPrime = (n % curPrime != 0)
        i += 1
        curPrime = primes[i]

    return isPrime


def appendNextPrime(primes):
    size = len(primes)
    n = primes[size - 1] + 2

    while not isPrime(primes, n):
        n += 1

    primes.append(n)


primes = [2, 3]

for i in range(0, 10000):
    appendNextPrime(primes)

print(primes[10000])
