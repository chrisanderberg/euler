primes = [2, 3, 5]


def isPrime(n):
    global primes
    if n < 2:
        return False
    lastPrime = primes[len(primes) - 1]
    while lastPrime * lastPrime <= n:
        appendNextPrime()
        lastPrime = primes[len(primes) - 1]
    i = 0
    curPrime = primes[i]
    isPrime = True
    while isPrime and (curPrime*curPrime <= n):
        isPrime = (n % curPrime != 0)
        i += 1
        curPrime = primes[i]
    return isPrime


def appendNextPrime():
    global primes
    size = len(primes)
    n = primes[size - 1] + 2
    while not isPrime(n):
        n += 2
    primes.append(n)


def getPrime(n):
    global primes
    while len(primes) <= n:
        appendNextPrime()
    return primes[n]


def primeFactor(n):
    exponents = []
    i = 0
    while n > 1:
        prime = getPrime(i)
        exponent = 0
        while n % prime == 0:
            exponent += 1
            n //= prime
        exponents.append(exponent)
        i += 1
    return exponents
