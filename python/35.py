#!/usr/bin/python


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


def rotateNum(n):
    digits = digitize(n)
    if len(digits) < 2:
        return n
    else:
        lastDigit = digits.pop()
        return digitsToNum([lastDigit] + digits)


class Primes:
    primes = [2, 3, 5]

    @staticmethod
    def isPrime(n):
        if n < 2:
            return False
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


def isCircularPrime(n):
    result = True
    p = rotateNum(n)
    while p != n and result:
        result = Primes.isPrime(p)
        p = rotateNum(p)
    return result


i = 0
count = 0
p = 2
while p < 1000000:
    if isCircularPrime(p):
        count += 1
    i += 1
    p = Primes.getPrime(i)
print(count)
