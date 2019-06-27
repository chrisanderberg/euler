#!/usr/bin/python
import fractions


def digitize(n):
    digits = []
    while n > 0:
        digits.append(n % 10)
        n //= 10
    digits.reverse()
    return digits


class Fract:
    def __init__(self, num, den):
        self.num = num
        self.den = den
        self.val = num / den

    def isCurious(self):
        result = False
        numDigits = digitize(self.num)
        denDigits = digitize(self.den)
        if numDigits[0] == denDigits[1] and denDigits[0] * self.num == numDigits[1] * self.den:
            result = True
        if numDigits[1] == denDigits[0] and denDigits[1] * self.num == numDigits[0] * self.den:
            result = True
        return result

    def __str__(self):
        return str(self.num) + ' / ' + str(self.den)


curiousFractions = []
for num in range(10, 99):
    for den in range(num + 1, 100):
        f = Fract(num, den)
        if f.isCurious():
            curiousFractions.append(f)

num = 1
den = 1
for f in curiousFractions:
    num *= f.num
    den *= f.den
print(den // fractions.gcd(num, den))
