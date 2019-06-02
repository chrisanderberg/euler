#!/usr/bin/python


class Products:
    products = set()


def digitsToNum(digits):
    num = 0
    for digit in digits:
        num *= 10
        num += digit
    return num


def splitter(determinedSymbols):
    for multiplicandLength in range(1, len(determinedSymbols)-1):
        for multiplierLength in range(1, len(determinedSymbols)-multiplicandLength):
            productLength = len(determinedSymbols) - \
                multiplicandLength - multiplierLength
            multiplicand = digitsToNum(determinedSymbols[:multiplicandLength])
            multiplier = digitsToNum(
                determinedSymbols[multiplicandLength:multiplicandLength+multiplierLength])
            product = digitsToNum(
                determinedSymbols[multiplicandLength+multiplierLength:])

            if multiplicand * multiplier == product:
                if product not in Products.products:
                    Products.products.add(product)


def permutator(determinedSymbols, remainingSymbols):
    if remainingSymbols:
        for i in range(0, len(remainingSymbols)):
            symbol = remainingSymbols[i]
            permutator(determinedSymbols +
                       [symbol], remainingSymbols[:i] + remainingSymbols[i+1:])
    else:
        splitter(determinedSymbols)


permutator([], [1, 2, 3, 4, 5, 6, 7, 8, 9])
s = 0
for product in Products.products:
    s += product

print(s)
