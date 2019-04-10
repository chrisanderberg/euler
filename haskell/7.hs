-- What is the 10,001st prime number?
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
