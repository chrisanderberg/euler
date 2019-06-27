#!/usr/bin/python


class Status:
    resultFound = False


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
        while isPrime and curPrime * curPrime <= n:
            isPrime = n % curPrime != 0
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


def permutator(determinedSymbols, remainingSymbols):
    if Status.resultFound:
        return
    if remainingSymbols:
        for i in range(0, len(remainingSymbols)):
            if Status.resultFound:
                return
            symbol = remainingSymbols[i]
            permutator(determinedSymbols +
                       [symbol], remainingSymbols[:i] + remainingSymbols[i + 1:])
    else:
        num = digitsToNum(determinedSymbols)
        if Primes.isPrime(num):
            print(num)
            Status.resultFound = True


for n in range(9, 0, -1):
    if Status.resultFound:
        break
    symbols = []
    for symbol in range(n, 0, -1):
        symbols.append(symbol)
    permutator([], symbols)
