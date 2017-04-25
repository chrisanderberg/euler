#!/usr/bin/python

def isPrime(primes,n):
	i = 0
	curPrime = primes[i]
	isPrime = True
	while isPrime and curPrime * curPrime <= n:
		isPrime = n % curPrime != 0
		i += 1
		curPrime = primes[i]

	return isPrime
		

def appendNextPrime(primes):
	size = len(primes)
	n = primes[size-1] + 2
	while not isPrime(primes, n):
		n += 1
	primes.append(n)

primes = [2,3]
i = 0
s = 0
while primes[i] < 2000000:
	s += primes[i]
	appendNextPrime(primes)
	i += 1

print s