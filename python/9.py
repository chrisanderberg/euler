#!/usr/bin/python

for a in range(1,501):
	for b in range(a+1,1001-a):
		c = 1000 - a - b
		if a*a + b*b == c*c:
			print a*b*c
