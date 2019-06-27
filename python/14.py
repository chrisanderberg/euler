#!/usr/bin/python


class Collatz:
    lengths = {1: 1}

    @staticmethod
    def getLength(n):
        length = 0
        stack = []
        while length == 0:
            if n in Collatz.lengths:
                length = Collatz.lengths[n]
            else:
                stack.append(n)
                if n % 2 == 0:
                    n = n // 2
                else:
                    n = (3 * n) + 1

        while len(stack) > 0:
            length += 1
            n = stack.pop()
            Collatz.lengths[n] = length

        return length


longestStart = 1
longestLength = 1
for i in range(1, 1000000):
    length = Collatz.getLength(i)
    if length > longestLength:
        longestLength = length
        longestStart = i

print(longestStart)
