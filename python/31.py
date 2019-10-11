#!/usr/bin/env python3


def combinations(amount, i):
    calculatedCombinations = [
    dict(), dict(), dict(), dict(), dict(), dict(), dict(), dict()]
    if i == 0:
        return 1
    else:
        if amount in calculatedCombinations[i]:
            return calculatedCombinations[i][amount]
        else:
            combs = 0
            while amount >= 0:
                combs += combinations(amount, i - 1)
                amount -= values[i]
            calculatedCombinations[i][amount] = combs
            return combs


values = [1, 2, 5, 10, 20, 50, 100, 200]
print(combinations(200, 7))
