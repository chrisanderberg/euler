#!/usr/bin/python


class Lattice:
    paths = {(0, 1): 1, (1, 0): 1}

    @staticmethod
    def countPaths(rows, cols):
        if (rows, cols) in Lattice.paths:
            return Lattice.paths[(rows, cols)]
        else:
            if rows == 0 or cols == 0:
                Lattice.paths[(rows, cols)] = 1
                return 1
            else:
                Lattice.paths[(rows, cols)] = Lattice.countPaths(
                    rows - 1, cols) + Lattice.countPaths(rows, cols - 1)
                return Lattice.paths[(rows, cols)]


print(Lattice.countPaths(20, 20))
