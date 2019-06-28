#!/usr/bin/python

# https://projecteuler.net/problem=3
#
# The prime factors of 13195 are 5, 7, 13 and 29.
#
# What is the largest prime factor of the number 600851475143?

def isPrime(primes, n):
    i = 0
    curPrime = primes[i]
    isPrime = True
    while isPrime and curPrime * curPrime <= n:
        isPrime = n % curPrime != 0
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
n = 600851475143
i = 0
prime = primes[i]
largest = None
while prime * prime <= n:
    if n % prime == 0:
        largest = prime
    appendNextPrime(primes)
    i += 1
    prime = primes[i]

print(largest)
