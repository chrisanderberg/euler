-- https://projecteuler.net/problem=3
--
-- The prime factors of 13195 are 5, 7, 13 and 29.
--
-- What is the largest prime factor of the number 600851475143?

import Data.Numbers.Primes

main :: IO ()
main = print $ head $ reverse $ primeFactors 600851475143

-- get a list of prime factors of a number, eg. primeFactors 12 => [2, 2, 3]
primeFactors :: Integer -> [Integer]
primeFactors n = primeFactors' n primes

-- worker function for primeFactors
primeFactors' :: Integer -> [Integer] -> [Integer]
primeFactors' n (p:ps) | p > n          = []
                       | n `mod` p == 0 = p : (primeFactors' (n `div` p) (p:ps))
                       | otherwise      = primeFactors' n ps
