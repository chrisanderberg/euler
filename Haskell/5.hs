-- Print the smallest number that is a multiple of all numbers from 1 to 20
main :: IO ()
main = print $ foldr lcm 1 [1..20]
