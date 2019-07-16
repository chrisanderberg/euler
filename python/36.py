#!/usr/bin/env python3


def digitize(n, base):
    digits = []

    while n > 0:
        digits.append(n % base)
        n //= base

    digits.reverse()
    return digits


def isPalindrome(l):
    rev = list(l)
    rev.reverse()
    return rev == l


def isQualified(n):
    base10 = digitize(n, 10)
    base2 = digitize(n, 2)
    return isPalindrome(base10) and isPalindrome(base2)


s = 0

for i in range(1, 1000000):
    if isQualified(i):
        s += i

print(s)
