#!/usr/bin/python


class Primes:
    primes = [2, 3, 5]

    @staticmethod
    def isPrime(n):
        lastPrime = Primes.primes[len(Primes.primes)-1]
        while lastPrime * lastPrime <= n:
            Primes.appendNextPrime()
            lastPrime = Primes.primes[len(Primes.primes)-1]

        i = 0
        curPrime = Primes.primes[i]
        isPrime = True
        while isPrime and curPrime * curPrime <= n:
            isPrime = n % curPrime != 0
            i += 1
            curPrime = Primes.primes[i]

        return isPrime

    @staticmethod
    def appendNextPrime():
        size = len(Primes.primes)
        n = Primes.primes[size-1] + 2
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


def properDivisors(n):
    exponents = Primes.primeFactor(n)
    divisors = [1]
    for i in range(0, len(exponents)):
        prime = Primes.getPrime(i)
        newDivisors = []
        for exponent in range(1, exponents[i] + 1):
            multiple = prime ** exponent
            for divisor in divisors:
                newDivisors.append(divisor * multiple)
        for newDivisor in newDivisors:
            divisors.append(newDivisor)

    # pop n from the list of divisors to return only proper divisors
    divisors.pop()
    return divisors


def isAbundant(n):
    if n < 12:
        return False
    else:
        return sum(properDivisors(n)) > n


def isSumOfAbundants(abundants, n):
    result = False
    if n >= 24:
        for i in range(0, n//2 + 1):
            result = abundants[i] and abundants[n-i]
            if result:
                break
    return result


abundants = []
for i in range(0, 28124):
    abundants.append(isAbundant(i))

s = 0
for i in range(0, 28124):
    if not isSumOfAbundants(abundants, i):
        s += i

print(s)
