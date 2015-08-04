-- Print the smallest number where all numbers from 1 to 20 are multiples
main = do print (foldr (\x y -> lcm x y) 1 [1..20])
