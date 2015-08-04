-- There exists exactly one Pythagorean triplet for which a + b + c = 1000. Find the product abc.
main = print (head (map (\(a,b,c) -> a*b*c) (filter (\(a,b,c) -> a+b+c == 1000) pythagoreanTriplets)))

-- given a list of elements, produce a new list with every combination of elements
combinationProducer :: [a] -> [(a,a)]
combinationProducer xs = combinationProducerR [] xs

-- core recursive function to get each combination of elements
combinationProducerR :: [a] -> [a] -> [(a,a)]
combinationProducerR xs []     = []
combinationProducerR xs (y:ys) = (y,y):((map (\x -> (x,y)) xs) ++ (combinationProducerR (y:xs) ys))

-- get the squareRoot of an integer, return nothing if integer is not square
squareRoot :: Integer -> Maybe Integer
squareRoot n = squareRootR n ((firstPower n 0) - 1) 0

-- recursive function to get the square root of an integer, or return nothing if it is not square
squareRootR :: Integer -> Integer -> Integer -> Maybe Integer
squareRootR n (-1) x             = if x^2 == n then Just x else Nothing
squareRootR n p    x | x2^2 > n  = squareRootR n (p-1) x
                     | otherwise = squareRootR n (p-1) x2
								     where x2 = (x + 2^p)

-- find the first power of 2 that is greater than the squareroot of n
firstPower :: Integer -> Integer -> Integer
firstPower n p = if 2^p > n then p else firstPower n (p+1)

-- get all pythagorean triplets
pythagoreanTriplets :: [(Integer, Integer, Integer)]
pythagoreanTriplets = correctTriplets (map (\(a,b) -> (a,b,squareRoot ((a^2) + (b^2)))) (combinationProducer[1..]))

-- extract the integers from triplets that have a square integer for c
correctTriplets :: [(Integer, Integer, Maybe Integer)] -> [(Integer, Integer, Integer)]
correctTriplets ((_,_,Nothing):xs) = correctTriplets xs
correctTriplets ((a,b,Just c):xs)  = (a,b,c):(correctTriplets xs)
