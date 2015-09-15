-- Find the thirteen adjacent digits in the 1000-digit number that have the greatest product. What is the value of this product?
import Data.Char

main :: IO ()
main = do inputContent <- readFile "8.txt"
          let bigNumber = read $ filter isDigit inputContent :: Integer
          print $ maximum $ nConsecutiveProduct 13 $ digitize bigNumber

-- given a number, return a list of its digits in reverse order
digitize :: Integer -> [Integer]
digitize 0 = []
digitize x =  (x `mod` 10) : digitize (x `quot` 10)

-- get the product of the first n numbers in a list, or 0 if there aren't n numbers remaining
nProduct :: Int -> [Integer] -> Integer
nProduct n xs | length xs < n = 0
              | otherwise     = product $ take n xs

-- get the products of all n consecutive numbers in a large list of numbers
nConsecutiveProduct :: Int -> [Integer] -> [Integer]
nConsecutiveProduct _ []     = []
nConsecutiveProduct n (x:xs) = nProduct n (x:xs) : nConsecutiveProduct n xs
