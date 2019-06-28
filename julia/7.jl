# https://projecteuler.net/problem=7
#
# By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13,
# we can see that the 6th prime is 13.
#
# What is the 10 001st prime number?

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

primes = zeros(Int, 10001)

for i = 1:10001
    calcprime!(primes, i)
end

println(primes[10001])
