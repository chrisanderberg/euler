-- There exists exactly one Pythagorean triplet for which a + b + c = 1000. Find the product abc.
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
