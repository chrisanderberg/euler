#!/usr/bin/python
import string

def digitize(n):
	digits = []
	while n > 0:
		digits.append(n % 10)
		n //= 10
	return digits

def fileNumsToList(filename):
	f = open(filename, 'r')
	contents = f.read()

	numstring = ''
	nums = []
	for i in range(0,len(contents)):
		char = contents[i]
		if char in string.digits:
			numstring += char
		elif numstring:
			nums.append(int(numstring))
			numstring = ''
		else:
			pass

	return nums

nums = fileNumsToList('13.txt')
digits = digitize(sum(nums))
digits.reverse()
digits
num = 0
for i in range(0,10):
	num *= 10
	num += digits[i]
print num

