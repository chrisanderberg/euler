for a = 1:(1000 ÷ 3), b = a:((1000 - a) ÷ 2)
    c = 1000 - a - b
    a * a + b * b == c * c && (println(a * b * c); break)
end
