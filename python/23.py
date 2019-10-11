#!/usr/bin/env python3

import primes


def properDivisors(n):
    exponents = primes.primeFactor(n)
    divisors = [1]
    for i in range(0, len(exponents)):
        prime = primes.getPrime(i)
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
        for i in range(0, (n // 2) + 1):
            result = abundants[i] and abundants[n - i]
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
