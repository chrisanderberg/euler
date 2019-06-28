#!/usr/bin/python

# https://projecteuler.net/problem=9
#
# A Pythagorean triplet is a set of three natural numbers, a < b < c,
# for which a^2 + b^2 = c^2.
#
# For example, 32 + 42 = 9 + 16 = 25 = 52.
#
# There exists exactly one Pythagorean triplet for which a + b + c = 1000.
# Find the product abc.

for a in range(1, 501):
    for b in range(a + 1, 1001 - a):
        c = 1000 - a - b
        if (a * a) + (b * b) == (c * c):
            print(a * b * c)
