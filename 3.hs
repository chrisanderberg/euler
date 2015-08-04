-- Print the largest prime factor of 600851475143
main = do print (last (getPrimeFactors 600851475143))

-- Get an infinite list of primes
primes :: [Integer]
primes = filter isPrime [1..]

-- Determine if an integer is prime
isPrime :: Integer -> Bool
isPrime n | n < 2     = False
          | n == 2    = True
          | otherwise = not (hasPrimeFactor n primes)

-- Search for a prime factor of n
hasPrimeFactor :: Integer -> [Integer] -> Bool
hasPrimeFactor n []                      = False
hasPrimeFactor n (p:ps) | n `mod` p == 0 = True
                        | (p ^ 2) > n    = False
                        | otherwise      = hasPrimeFactor n ps

-- Get all the prime factors of integer n
getPrimeFactors :: Integer -> [Integer]
getPrimeFactors n = getPrimeFactorsR n primes

-- Get all the prime factors of integer n given a list of primes to check
getPrimeFactorsR :: Integer -> [Integer] -> [Integer]
getPrimeFactorsR _ []                      = []
getPrimeFactorsR n (p:ps) | p > n          = []
                          | n `mod` p == 0 = p:(getPrimeFactorsR (quot n p) ps)
                          | otherwise      = getPrimeFactorsR n ps
