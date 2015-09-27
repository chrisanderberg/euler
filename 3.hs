-- Print the largest prime factor of 600851475143
main :: IO ()
main = print $ largestPrimeFactor 600851475143
  where largestPrimeFactor = largestPrimeFactorWorker 2

-- find the largest prime factor of n, starting by trying to divide by f
-- when f > sqrt(n), n must be prime
-- when n `mod` f == 0, n is not prime and is divided by f
-- otherwise n is not divisible by f, so increment f and continue factoring
largestPrimeFactorWorker :: Integer -> Integer -> Integer
largestPrimeFactorWorker f n | f * f > n      = n
                             | n `mod` f == 0 = largestPrimeFactorWorker    f    (n `quot` f)
                             | otherwise      = largestPrimeFactorWorker (f + 1)      n
