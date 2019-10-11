#!/usr/bin/env python3

paths = {(0, 1): 1, (1, 0): 1}
def countPaths(rows, cols):
    if (rows, cols) in paths:
        return paths[(rows, cols)]
    else:
        if rows == 0 or cols == 0:
            paths[(rows, cols)] = 1
            return 1
        else:
            paths[(rows, cols)] = countPaths(
                rows - 1, cols) + countPaths(rows, cols - 1)
            return paths[(rows, cols)]


print(countPaths(20, 20))
