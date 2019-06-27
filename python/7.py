#!/usr/bin/python


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
    n = primes[size - 1] + 2
    while not isPrime(primes, n):
        n += 1
    primes.append(n)


primes = [2, 3]

for i in range(0, 10000):
    appendNextPrime(primes)

print(primes[10000])
