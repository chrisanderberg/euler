#!/usr/bin/python


def spiral(size):
    size //= 2
    s = 1
    num = 1
    interval = 0
    for i in range(0, size):
        interval += 2
        for j in range(0, 4):
            num += interval
            s += num
    return s


print(spiral(1001))
