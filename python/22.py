#!/usr/bin/env python3

import os
import string


class Name:
    letterValues = {'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9, 'J': 10, 'K': 11, 'L': 12, 'M': 13,
                    'N': 14, 'O': 15, 'P': 16, 'Q': 17, 'R': 18, 'S': 19, 'T': 20, 'U': 21, 'V': 22, 'W': 23, 'X': 24, 'Y': 25, 'Z': 26}

    def __init__(self, name):
        self.name = name

    def __str__(self):
        return self.name

    def letterValAtPosition(self, i):
        if i >= len(self.name):
            return 0
        else:
            return Name.letterValues[self.name[i]]

    def alphabeticalValue(self):
        val = 0
        for i in range(0, len(self.name)):
            val += self.letterValAtPosition(i)
        return val

    def __cmp__(self, other):
        if self.name < other.name:
            return -1
        elif self.name > other.name:
            return 1
        else:
            return 0

    def __lt__(self, other):
        return self.__cmp__(other) == -1

    def __gt__(self, other):
        return self.__cmp__(other) == 1

    def __eq__(self, other):
        return self.__cmp__(other) == 0

    def __le__(self, other):
        return self.__lt__(other) or self.__eq__(other)

    def __ge__(self, other):
        return self.__gt__(other) or self.__eq__(other)


def fileNamesToList(filename):
    f = open(filename, 'r')
    contents = f.read()
    name = ''
    names = []
    for i in range(len(contents)):
        char = contents[i]
        if char in string.ascii_uppercase:
            name += char
        elif char == ',':
            names.append(Name(name))
            name = ''
        else:
            pass
    return names


names = fileNamesToList(os.path.dirname(
    os.path.abspath(__file__)) + '/names.txt')
names.sort()
s = 0
for i in range(0, len(names)):
    s += names[i].alphabeticalValue() * (i+1)
print(s)