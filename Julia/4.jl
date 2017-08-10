function ispalendromeworker(n, base, pushdown)
    if pushdown == 0
        true, n
    else
        pass, popup = ispalendromeworker(n, base, pushdown ÷ base)
        pass && pushdown % base == popup % base, popup ÷ base
    end
end

function ispalendrome(n, base)
    pass, popup = ispalendromeworker(n, base, n)
    pass && popup == 0
end

largest = 0
for i = 100:999, j = i:999
    product = i * j
    product > largest && ispalendrome(product, 10) && (largest = product)
end

println(largest)
