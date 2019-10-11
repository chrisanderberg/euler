#!/usr/bin/env python3

a = 1
b = 1
i = 2
minimum = 10 ** 999
while b < minimum:
    tmp = a
    a = b
    b += tmp
    i += 1
print(i)
