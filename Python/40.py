#!/usr/bin/python

def digitize(n):
	digits = []
	while n > 0:
		digits.append(n % 10)
		n //= 10
	digits.reverse()
	return digits

class Champernowne:
	fractionalPart = []
	nextInt = 1

	@staticmethod
	def getDigit(i):
		while len(Champernowne.fractionalPart) < i:
			Champernowne.appendNextInt()
		return Champernowne.fractionalPart[i-1]

	@staticmethod
	def appendNextInt():
		digits = digitize(Champernowne.nextInt)
		Champernowne.nextInt += 1
		Champernowne.fractionalPart += digits

product = 1
for i in [1,10,100,1000,10000,100000,1000000]:
	product *= Champernowne.getDigit(i)
print product
