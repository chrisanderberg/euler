function _gcd(a, b)
    if a < b
        _gcd(b, a)
    else
        remainder = a % b
        remainder == 0 ? b : _gcd(b, remainder)
    end
end

_lcm(a, b) = a ÷ _gcd(a, b) * b

println(reduce(_lcm, 1, 1:20))
