#!/usr/bin/python

import fractions

product = 1
for i in range(1,21):
	product *= (i // fractions.gcd(product,i))

print product
