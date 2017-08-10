function calcprime!(primes, n)
    if n == 1
        primes[1] = 2
    elseif n == 2
        primes[2] = 3
    else
        # find the next prime, starting with the last prime plus 2
        primecandidate = primes[n - 1]
        while primes[n] == 0
            primecandidate += 2

            # determine if the prime candidate is a prime
            i = 0
            foundprime = true
            while (i += 1; primes[i] * primes[i] <= primecandidate && foundprime)
                primecandidate % primes[i] == 0 && (foundprime = false)
            end

            # if a prime was found store it in the list of found primes
            foundprime && (primes[n] = primecandidate)
        end
    end
    primes[n]
end

n = 600851475143
primes = zeros(Int, 10000)
prime = 1
i = 0
while n > 1
    i += 1; prime = calcprime!(primes, i)
    while n % prime == 0
        n /= prime
    end
end

println(prime)
