#!/usr/bin/python

s = set()

for a in range(2, 101):
    for b in range(2, 101):
        num = a ** b
        if num not in s:
            s.add(num)

print(len(s))
