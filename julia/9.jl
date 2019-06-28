# https://projecteuler.net/problem=9
#
# A Pythagorean triplet is a set of three natural numbers, a < b < c,
# for which a^2 + b^2 = c^2.
#
# For example, 32 + 42 = 9 + 16 = 25 = 52.
#
# There exists exactly one Pythagorean triplet for which a + b + c = 1000.
# Find the product abc.

for a = 1:(1000 ÷ 3), b = a:((1000 - a) ÷ 2)
    c = 1000 - a - b
    a * a + b * b == c * c && (println(a * b * c); break)
end
