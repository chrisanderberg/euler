-- Print the sum of all multiples of 3 and 5 that are less than 1000
main = do print (sum (getMultiples [3,5] [1..999]))

-- Check if m is a multiple of f
isMultiple :: Int -> Int -> Bool
isMultiple m f = (mod m f) == 0

-- Given a list of factors, check if m is a multiple of any of them
hasFactorInList ::  [Int] -> Int -> Bool
hasFactorInList fs m = foldr (||) False (map (isMultiple m) fs)

-- Filter ns, leaving only multiples of factors fs
getMultiples :: [Int] -> [Int] -> [Int]
getMultiples fs ns = filter (hasFactorInList fs) ns


