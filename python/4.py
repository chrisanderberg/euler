#!/usr/bin/env python3

"""
https://projecteuler.net/problem=4

A palindromic number reads the same both ways. The largest palindrome
made from the product of two 2-digit numbers is 9009 = 91 x 99.

Find the largest palindrome made from the product of two 3-digit
numbers.
"""


def digitize(n):
    digits = []
    while n > 0:
        digits.append(n % 10)
        n //= 10
    return digits


def isPalindrome(n):
    digits = digitize(n)
    reversedDigits = list(digits)
    reversedDigits.reverse()
    return digits == reversedDigits


palindrome = 0
for a in range(100, 1000):
    for b in range(a, 1000):
        if a*b > palindrome:
            if isPalindrome(a*b):
                palindrome = a*b
print(palindrome)
