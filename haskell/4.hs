-- print the largest palindromic number that is a product of two 3-digit numbers
main :: IO ()
main = print $ maximum $ palindromes [100..999]

-- get all palindromes produced by any combination of 2 numbers in the arg
palindromes :: [Int] -> [Int]
palindromes   []   = []
palindromes (x:xs) = filter isPalindrome (map (\y -> x * y) xs) ++ palindromes xs

-- given a number, return a list of its digits in reverse order
-- digitize 184 => [4, 8, 1]
digitize :: Int -> [Int]
digitize 0 = []
digitize x = x `mod` 10 : digitize (x `quot` 10)

-- check if an integer is a palindrome
isPalindrome :: Int -> Bool
isPalindrome x = digitize x == (reverse . digitize) x
