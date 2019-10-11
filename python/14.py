#!/usr/bin/env python3

lengths = {1: 1}


def getLength(n):
    length = 0
    stack = []
    while length == 0:
        if n in lengths:
            length = lengths[n]
        else:
            stack.append(n)
            if n % 2 == 0:
                n = n // 2
            else:
                n = (3 * n) + 1
    while len(stack) > 0:
        length += 1
        n = stack.pop()
        lengths[n] = length
    return length


longestStart = 1
longestLength = 1
for i in range(1, 1000000):
    length = getLength(i)
    if length > longestLength:
        longestLength = length
        longestStart = i
print(longestStart)
