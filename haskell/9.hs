-- https://projecteuler.net/problem=9
--
-- A Pythagorean triplet is a set of three natural numbers, a < b < c,
-- for which a^2 + b^2 = c^2.
--
-- For example, 32 + 42 = 9 + 16 = 25 = 52.
--
-- There exists exactly one Pythagorean triplet for which a + b + c = 1000.
-- Find the product abc.

type PythagoreanTriplet = (Int, Int, Int)

main :: IO ()
main = print $ tripletProduct $ head $ pythagoreanTriplets 1000

-- get all pythagorean triplets where the sum of a + b + c is equal to the first argument
pythagoreanTriplets :: Int -> [PythagoreanTriplet]
pythagoreanTriplets n = filter isValidTriplet [(a, b, n - a - b) | a <- [1..n], b <- [1..a]]

-- test if a triplet is a valid pythagorean triplet
isValidTriplet :: PythagoreanTriplet -> Bool
isValidTriplet (a, b, c) = a * a + b * b == c * c

-- get the product of the components of a pythagorean triplet
tripletProduct :: PythagoreanTriplet -> Int
tripletProduct (a, b, c) = a * b * c
