-- Print the largest prime factor of 600851475143
import Data.Numbers.Primes

main :: IO ()
main = print $ head $ reverse $ primeFactors 600851475143

primeFactors :: Integer -> [Integer]
primeFactors n = primeFactors' n primes

primeFactors' :: Integer -> [Integer] -> [Integer]
primeFactors' n (p:ps) | p * p > n      = []
                       | n `mod` p == 0 = p : primeFactors' n ps
                       | otherwise      = primeFactors' n ps
