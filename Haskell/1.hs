-- Print the sum of all multiples of 3 and 5 that are less than 1000
main :: IO ()
main = print . sum $ filter multiple3or5 [1..999]
  where multiple3or5 :: Integer -> Bool
        multiple3or5 n = (n `mod` 3 == 0) || (n `mod` 5 == 0)
