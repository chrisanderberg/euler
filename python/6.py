#!/usr/bin/python


def sumOfSquares(n):
    squares = []
    for i in range(1, n + 1):
        squares.append(i * i)

    return sum(squares)


def squareOfSum(n):
    s = (n * n + n) // 2
    return s * s


print(squareOfSum(100) - sumOfSquares(100))
