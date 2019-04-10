#!/usr/bin/python
import string

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

class Triangle:
	def __init__(self, rows, filename):
		self.nums = fileNumsToList(filename)
		self.rows = rows
		self.totals = dict()

	@staticmethod
	def calcIndex(row, col):
		return (row * row + row) // 2 + col

	def getNum(self, row, col):
		return self.nums[Triangle.calcIndex(row,col)]

	def maxTotal(self, row, col):
		if (row, col) in self.totals:
			pass
		elif row == self.rows - 1:
			self.totals[(row,col)] = self.getNum(row,col)
		else:
			if self.maxTotal(row + 1, col) > self.maxTotal(row + 1, col + 1):
				self.totals[(row,col)] = self.getNum(row,col) + self.maxTotal(row + 1, col)
			else:
				self.totals[(row,col)] = self.getNum(row,col) + self.maxTotal(row + 1, col + 1)
		return self.totals[(row,col)]


triangle = Triangle(15, '18.txt')
print triangle.maxTotal(0,0)
