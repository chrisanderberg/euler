#!/usr/bin/python
import string

class Word:
	letterValues = {'A':1,'B':2,'C':3,'D':4,'E':5,'F':6,'G':7,'H':8,'I':9,'J':10,'K':11,'L':12,'M':13,'N':14,'O':15,'P':16,'Q':17,'R':18,'S':19,'T':20,'U':21,'V':22,'W':23,'X':24,'Y':25,'Z':26}

	def __init__(self, word):
		self.word = word

	def __str__(self):
		return self.word

	def letterValAtPosition(self, i):
		if i >= len(self.word):
			return 0
		else:
			return Word.letterValues[self.word[i]]

	def alphabeticalValue(self):
		val = 0
		for i in range(0, len(self.word)):
			val += self.letterValAtPosition(i)

		return val

	def __cmp__(self, other):
		i = 0
		result = 0
		while result == 0 and not (self.letterValAtPosition(i) == 0 and other.letterValAtPosition(i) == 0):
			if self.letterValAtPosition(i) > other.letterValAtPosition(i):
				result = 1
			if self.letterValAtPosition(i) < other.letterValAtPosition(i):
				result = -1
			i += 1

		return result

	def isTriangle(self):
		val = self.alphabeticalValue()
		t = 0
		n = 1
		while t < val:
			t += n
			n += 1
		return t == val

def fileWordsToList(filename):
	f = open(filename, 'r')
	contents = f.read()

	word = ''
	words = []
	for i in range(0,len(contents)):
		char = contents[i]
		if char in string.ascii_letters:
			word += char
		elif word:
			words.append(Word(word))
			word = ''
		else:
			pass

	return words

count = 0
words = fileWordsToList('words.txt')
for word in words:
	if word.isTriangle():
		count += 1
print count
