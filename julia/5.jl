# https://projecteuler.net/problem=5
#
# 2520 is the smallest number that can be divided by each of
# the numbers from 1 to 10 without any remainder.
#
# What is the smallest positive number that is evenly
# divisible by all of the numbers from 1 to 20?

function _gcd(a, b)
    if a < b
        _gcd(b, a)
    else
        remainder = a % b
        remainder == 0 ? b : _gcd(b, remainder)
    end
end

_lcm(a, b) = a ÷ _gcd(a, b) * b

println(reduce(_lcm, 1, 1:20))
