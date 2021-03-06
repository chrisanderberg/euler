-- https://projecteuler.net/problem=10
--
-- The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.
-- 
-- Find the sum of all the primes below two million.

import Data.Numbers.Primes

main :: IO ()
main = print $ sum $ primesLessThan 2000000

primesLessThan :: Integer -> [Integer]
primesLessThan n = primesLessThan' n primes

primesLessThan' :: Integer -> [Integer] -> [Integer]
primesLessThan' n (p:ps) | p < n     = p : (primesLessThan' n ps)
                         | otherwise = []
