#!/usr/bin/env python3


def isRight(a, b, c):
    return a*a + b*b == c*c


def countRightTriangles(perimeter):
    count = 0
    for a in range(1, perimeter//3 + 2):
        for b in range(a, (perimeter-a)//2 + 1):
            c = perimeter - a - b
            if isRight(a, b, c):
                count += 1
    return count


perimeter = 0
largestCount = 0
for p in range(1, 1001):
    count = countRightTriangles(p)
    if count > largestCount:
        perimeter = p
        largestCount = count
print(perimeter)
