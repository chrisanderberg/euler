# https://projecteuler.net/problem=4
#
# A palindromic number reads the same both ways.
# The largest palindrome made from the product
# of two 2-digit numbers is 9009 = 91 × 99.
#
# Find the largest palindrome made from the product of two 3-digit numbers.

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
