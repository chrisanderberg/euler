-- print the sum of all even fibonacci numbers less than 4000000
main = do print (sum (filter even (fibsLessThan 4000000)))

-- get all the fibonacci numbers
fibs :: Integer -> Integer -> [Integer]
fibs x y = x : (fibs y (x + y))

-- get all the fibonacci numbers less than a max value
fibsLessThan :: Integer -> [Integer]
fibsLessThan m = numsLessThanR m (fibs 1 1)

-- get all numbers less than a max value, assuming list is in accending order
numsLessThanR :: Integer -> [Integer] -> [Integer]
numsLessThanR m (h:t) | h < m     = h : (numsLessThanR m t)
                      | otherwise = []
