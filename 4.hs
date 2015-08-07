-- print the largest plindromic number that is a product of two 3-digit numbers
main :: IO()
main = print $ maximum palindromes

-- get all the palindromes of two 3-digit number products
palindromes :: [Int]
palindromes  = filter isPalindrome $ map (\(x,y) -> x*y) $ combinationProducer [100..999]

-- given a list of elements, produce a new list with every combination of elements
combinationProducer :: [a] -> [(a,a)]
combinationProducer = combinationProducerR []

-- core recursive function to get each combination of elements
combinationProducerR :: [a] -> [a] -> [(a,a)]
combinationProducerR _    []   = []
combinationProducerR xs (y:ys) = map (\x -> (x,y)) xs ++ combinationProducerR (y:xs) ys

-- given a number, return a list of its digits in reverse order
-- digitize 184 => [4, 8, 1]
digitize :: Int -> [Int]
digitize 0 = []
digitize x = x `mod` 10 : digitize (x `quot` 10)

-- check if an integer is a palindrome
isPalindrome :: Int -> Bool
isPalindrome x = digitize x == (reverse . digitize) x
