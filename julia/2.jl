a = 1
b = 2

sum = 0

while b < 4000000
    b % 2 == 0 && (sum += b)
    b += a
    a = b - a
end

println(sum)
