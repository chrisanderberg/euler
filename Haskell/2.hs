-- print the sum of all even fibonacci numbers less than 4000000
main :: IO ()
main = print . sum $ filter even $ fibs `lessThan` 4000000
  where lessThan xs n = takeWhile (< n) xs
        fibs = fib 0 1
          where fib :: Integer -> Integer -> [Integer]
                fib x y = x : fib y (x + y)
