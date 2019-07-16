#!/usr/bin/env python3

"""https://projecteuler.net/problem=6

The sum of the squares of the first tem natural numbers is,
1^2 + 2^2 + ... + 10^2 = 385

The square of the sum of the first ten natural numbers is,
(1 + 2 + ... + 10)^2 = 55^2 = 3025

Hence the difference between the sum of the squares of the
first ten natural numbers and the square of the sum is
3025 - 385 = 2640.

Find the difference between the sum of the squares of the
first one hundred natural numbers and the square of the sum."""


def sumOfSquares(n):
    squares = []

    for i in range(1, n + 1):
        squares.append(i * i)

    return sum(squares)


def squareOfSum(n):
    s = (n * n + n) // 2
    return s * s


print(squareOfSum(100) - sumOfSquares(100))
