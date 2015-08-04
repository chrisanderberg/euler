-- Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.
main = do print (((sum [1..100]) ^ 2) - (sum (map (\x -> x^2) [1..100])))
