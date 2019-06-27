#!/usr/bin/python


def digitize(n):
    digits = []
    while n > 0:
        digits.append(n % 10)
        n //= 10
    return digits


def isCurious(n):
    factorial = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880]
    digits = digitize(n)
    s = 0
    for digit in digits:
        s += factorial[digit]
    return s == n


s = 0
for i in range(3, 10000000):
    if i % 500000 == 0:
        pass
        # print(str(i // 100000) + '%')
    if isCurious(i):
        s += i
print(s)
