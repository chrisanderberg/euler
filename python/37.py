#!/usr/bin/env python3


def digitize(n):
    digits = []

    while n > 0:
        digits.append(n % 10)
        n //= 10

    digits.reverse()
    return digits


def digitsToNum(digits):
    num = 0

    for digit in digits:
        num *= 10
        num += digit

    return num


class Primes:
    primes = [2, 3, 5]

    @staticmethod
    def isPrime(n):
        if n < 2:
            return False

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


def isLeftTruncatable(p):
    if p in [2, 3, 5, 7]:
        return True
    if Primes.isPrime(p):
        return isLeftTruncatable(digitsToNum(digitize(p)[1:]))

    return False


def isRightTruncatable(p):
    if p in [2, 3, 5, 7]:
        return True
    if Primes.isPrime(p):
        digits = digitize(p)
        return isRightTruncatable(digitsToNum(digits[:len(digits) - 1]))

    return False


def isTruncatable(p):
    return isRightTruncatable(p) and isLeftTruncatable(p)


i = 4
count = 0
s = 0

while count < 11:
    p = Primes.getPrime(i)

    if isTruncatable(p):
        count += 1
        s += p

    i += 1

print(s)
