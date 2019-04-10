#!/usr/bin/python

def countCycles(d):
	i = 0
	n = 1
	ns = dict()
	while n not in ns:
		ns[n] = i
		n = 10 * (n % d)
		i += 1
	return i - ns[n]

longestCycle = 0
longestD = 0
for d in range(1,1000):
	cycles = countCycles(d)
	if cycles > longestCycle:
		longestCycle = cycles
		longestD = d

print longestD
		
