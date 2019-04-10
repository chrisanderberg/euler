#!/usr/bin/python

class Status:
	resultFound = False

def digitize(n):
	digits = []
	while n > 0:
		digits.append(n % 10)
		n //= 10
	digits.reverse()
	return digits

def digitsToNum(digits):
	num = 0
	for digit in digits:
		num *= 10
		num += digit
	return num

def calcNum(i, n):
	digits = []
	for j in range(1, n+1):
		digits = digits + digitize(i*j)
	return digitsToNum(digits)

def checkNum(num):
	for n in range(9,1,-1):
		maxi = 1
		mini = 1
		maxnum = 0
		while maxnum < num:
			maxi *= 2
			maxnum = calcNum(maxi, n)
		minnum = calcNum(mini, n)
		oldmin = 0
		oldmax = 0
		while minnum < num and maxnum > num and minnum != maxnum and not (oldmin == minnum and oldmax == maxnum):
			oldmin = minnum
			oldmax = maxnum
			midi = (mini + maxi) // 2
			midnum = calcNum(midi, n)
			if midnum > num:
				maxnum = midnum
				maxi = midi
			else:
				minnum = midnum
				mini = midi
		if minnum == num or maxnum == num:
			return True
	return False

def permutator(determinedSymbols, remainingSymbols):
	if Status.resultFound:
		return
	if remainingSymbols:
		for i in range(0, len(remainingSymbols)):
			if Status.resultFound:
				return
			symbol = remainingSymbols[i]
			permutator(determinedSymbols + [symbol], remainingSymbols[:i] + remainingSymbols[i+1:])
	else:
		num = digitsToNum(determinedSymbols)
		if checkNum(num):
			print num
			Status.resultFound = True

permutator([], [9,8,7,6,5,4,3,2,1])
	
