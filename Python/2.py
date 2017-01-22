#!/usr/bin/python

a = 1
b = 1
s = 0

while b < 4000000:
	if b % 2 == 0:
		s += b
	c = a + b
	a = b
	b = c

print s
