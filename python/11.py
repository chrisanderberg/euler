#!/usr/bin/python
import string


def fileNumsToList(filename):
    f = open(filename, 'r')
    contents = f.read()

    numstring = ''
    nums = []
    for i in range(0, len(contents)):
        char = contents[i]
        if char in string.digits:
            numstring += char
        elif numstring:
            nums.append(int(numstring))
            numstring = ''
        else:
            pass

    return nums


class Grid:
    def __init__(self, filename, numRows, numCols):
        self.numRows = numRows
        self.numCols = numCols
        self.nums = fileNumsToList(filename)

    def calcIndex(self, row, col):
        return row * self.numCols + col

    def getNum(self, row, col):
        return self.nums[self.calcIndex(row, col)]

    def maxProduct(self, size):
        maxProduct = 0

        # check horizontal products
        for row in range(0, self.numRows):
            for col in range(0, self.numCols-size):
                product = 1
                for i in range(0, size):
                    product *= self.getNum(row, col+i)
                if product > maxProduct:
                    maxProduct = product

        # check vertical products
        for row in range(0, self.numRows-size):
            for col in range(0, self.numCols):
                product = 1
                for i in range(0, size):
                    product *= self.getNum(row+i, col)
                if product > maxProduct:
                    maxProduct = product

        # check downward diagonal products
        for row in range(0, self.numRows-size):
            for col in range(0, self.numCols-size):
                product = 1
                for i in range(0, size):
                    product *= self.getNum(row+i, col+i)
                if product > maxProduct:
                    maxProduct = product

        # check upward diagonal products
        for row in range(size-1, self.numRows):
            for col in range(0, self.numCols-size):
                product = 1
                for i in range(0, size):
                    product *= self.getNum(row-i, col+i)
                if product > maxProduct:
                    maxProduct = product

        return maxProduct


grid = Grid('11.txt', 20, 20)
print(grid.maxProduct(4))
