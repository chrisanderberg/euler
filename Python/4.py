#!/usr/bin/python

def digitize(n):
	digits = []
	while n > 0:
		digits.append(n % 10)
		n //= 10
	return digits

def isPalindrome(n):
	digits = digitize(n)
	reversedDigits = list(digits)
	reversedDigits.reverse()
	return digits == reversedDigits

palindrome = 0
for a in range(100,1000):
	for b in range(a,1000):
		if a * b > palindrome:
			if isPalindrome(a*b):
				palindrome = a*b

print palindrome
