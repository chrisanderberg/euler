println(reduce(+, 0, 1:100)^2 - reduce(+, 0, map(x -> x^2, 1:100)))
