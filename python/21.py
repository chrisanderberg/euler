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


def d(n):
    return sum(properDivisors(n))


def isAmicable(n):
    return d(d(n)) == n and d(n) != n


s = 0
for i in range(2, 10000):
    if isAmicable(i):
        s += i
print(s)
