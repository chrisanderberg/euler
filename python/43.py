#!/usr/bin/python


class Status:
    count = 0


def digitsToNum(digits):
    num = 0
    for digit in digits:
        num *= 10
        num += digit
    return num


def permutator(determinedSymbols, remainingSymbols):
    if remainingSymbols:
        for i in range(0, len(remainingSymbols)):
            symbol = remainingSymbols[i]
            permutator(determinedSymbols +
                       [symbol], remainingSymbols[:i] + remainingSymbols[i + 1:])
    else:
        s1 = digitsToNum(determinedSymbols[1:4])
        s2 = digitsToNum(determinedSymbols[2:5])
        s3 = digitsToNum(determinedSymbols[3:6])
        s4 = digitsToNum(determinedSymbols[4:7])
        s5 = digitsToNum(determinedSymbols[5:8])
        s6 = digitsToNum(determinedSymbols[6:9])
        s7 = digitsToNum(determinedSymbols[7:10])
        if s1 % 2 == 0 and s2 % 3 == 0 and s3 % 5 == 0 and s4 % 7 == 0 and s5 % 11 == 0 and s6 % 13 == 0 and s7 % 17 == 0:
            num = digitsToNum(determinedSymbols)
            Status.count += num


permutator([], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
print(Status.count)
