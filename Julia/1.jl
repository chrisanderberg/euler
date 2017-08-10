sum = 0
for i = 1:999
    (i % 3 == 0 || i % 5 == 0) && (sum += i)
end
println(sum)
