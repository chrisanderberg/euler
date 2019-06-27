#!/usr/bin/python


class Coins:
    values = [1, 2, 5, 10, 20, 50, 100, 200]
    calculatedCombinations = [
        dict(), dict(), dict(), dict(), dict(), dict(), dict(), dict()]

    @staticmethod
    def combinations(amount, i):
        if i == 0:
            return 1
        else:
            if amount in Coins.calculatedCombinations[i]:
                return Coins.calculatedCombinations[i][amount]
            else:
                combs = 0
                while amount >= 0:
                    combs += Coins.combinations(amount, i - 1)
                    amount -= Coins.values[i]
                Coins.calculatedCombinations[i][amount] = combs
                return combs


print(Coins.combinations(200, 7))
