#!/usr/bin/env python3

import string
import digits


product = 1
for i in range(1, 101):
    product *= i
print(sum(digits.digitize(product)))
