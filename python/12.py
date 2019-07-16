#!/usr/bin/env python3


class Primes:
    primes = [2, 3, 5]

    @staticmethod
    def isPrime(n):
        lastPrime = Primes.primes[len(Primes.primes) - 1]

        while lastPrime * lastPrime <= n:
            Primes.appendNextPrime()
            lastPrime = Primes.primes[len(Primes.primes) - 1]

        i = 0
        curPrime = Primes.primes[i]
        isPrime = True

        while isPrime and (curPrime * curPrime <= n):
            isPrime = (n % curPrime != 0)
            i += 1
            curPrime = Primes.primes[i]

        return isPrime

    @staticmethod
    def appendNextPrime():
        size = len(Primes.primes)
        n = Primes.primes[size - 1] + 2

        while not Primes.isPrime(n):
            n += 2

        Primes.primes.append(n)

    @staticmethod
    def getPrime(n):
        while len(Primes.primes) <= n:
            Primes.appendNextPrime()

        return Primes.primes[n]

    @staticmethod
    def primeFactor(n):
        exponents = []
        i = 0

        while n > 1:
            prime = Primes.getPrime(i)
            exponent = 0

            while n % prime == 0:
                exponent += 1
                n //= prime

            exponents.append(exponent)
            i += 1

        return exponents


def countDivisors(n):
    exponents = Primes.primeFactor(n)
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
