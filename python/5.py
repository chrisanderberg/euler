#!/usr/bin/env python3

"""https://projecteuler.net/problem=5

2520 is the smallest number that can be divided by each of
the numbers from 1 to 10 without any remainder.

What is the smallest positive number that is evenly
divisible by all of the numbers from 1 to 20?"""

import fractions

product = 1

for i in range(1, 21):
    product *= (i // fractions.gcd(product, i))

print(product)
