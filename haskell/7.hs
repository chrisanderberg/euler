-- https://projecteuler.net/problem=6
--
-- The sum of the squares of the first tem natural numbers is,
-- 1^2 + 2^2 + ... + 10^2 = 385
--
-- The square of the sum of the first ten natural numbers is,
-- (1 + 2 + ... + 10)^2 = 55^2 = 3025
--
-- Hence the difference between the sum of the squares of the
-- first ten natural numbers and the square of the sum is
-- 3025 - 385 = 2640.
--
-- Find the difference between the sum of the squares of the
-- first one hundred natural numbers and the square of the sum.

main :: IO ()
main = print $ primes !! 10000 -- use 10000 since index is 0 based

-- Get an infinite list of primes
primes :: [Integer]
primes = filter isPrime [1..]

-- Determine if an integer is prime
isPrime :: Integer -> Bool
isPrime n | n < 2     = False
          | n == 2    = True
          | otherwise = not $ hasPrimeFactor n primes

-- Search for a prime factor of n
hasPrimeFactor :: Integer -> [Integer] -> Bool
hasPrimeFactor _ []                      = False
hasPrimeFactor n (p:ps) | n `mod` p == 0 = True
                        | (p ^ 2) > n    = False
                        | otherwise      = hasPrimeFactor n ps
