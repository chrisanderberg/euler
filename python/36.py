#!/usr/bin/env python3

import digits


def isPalindrome(l):
    rev = list(l)
    rev.reverse()
    return rev == l


def isQualified(n):
    base10 = digits.digitize(n, 10)
    base2 = digits.digitize(n, 2)
    return isPalindrome(base10) and isPalindrome(base2)


s = 0
for i in range(1, 1000000):
    if isQualified(i):
        s += i
print(s)
