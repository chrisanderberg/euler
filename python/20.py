#!/usr/bin/python
import string

def digitize(n):
	digits = []
	while n > 0:
		digits.append(n % 10)
		n //= 10
	return digits

product = 1
for i in range(1, 101):
	product *= i

print sum(digitize(product))
