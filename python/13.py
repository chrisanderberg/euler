#!/usr/bin/env python3

import os
import string
import digits


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


nums = fileNumsToList(os.path.dirname(os.path.abspath(__file__)) + '/13.txt')
ds = digits.digitize(sum(nums))
num = 0
for i in range(0, 10):
    num *= 10
    num += ds[i]
print(num)
