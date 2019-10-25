package primes

// PrimeSieve is a type for finding primes and doing related operations
type PrimeSieve struct {
	primes []int64
}

// NewPrimeSieve creates a new sieve
func NewPrimeSieve() *PrimeSieve {
	return &PrimeSieve{primes: []int64{2, 3, 5}}
}

func (primes *PrimeSieve) lastPrime() int64 {
	lastIndex := len(primes.primes) - 1
	return primes.primes[lastIndex]
}

// IsPrime returns true if num is prime, false otherwise
func (primes *PrimeSieve) IsPrime(num int64) bool {
	if num < 2 {
		return false
	}
	for lastPrime := primes.lastPrime(); lastPrime*lastPrime <= num; lastPrime = primes.lastPrime() {
		primes.appendNextPrime()
	}
	foundPrime := true
	for _, curPrime := range primes.primes {
		if num%curPrime == 0 {
			foundPrime = false
			break
		}
		if curPrime*curPrime > num {
			break
		}
	}
	return foundPrime
}

func (primes *PrimeSieve) appendNextPrime() {
	primeCandidate := primes.lastPrime() + 2
	for !primes.IsPrime(primeCandidate) {
		primeCandidate += 2
	}
	primes.primes = append(primes.primes, primeCandidate)
}

// GetPrime returns the nth prime
func (primes *PrimeSieve) GetPrime(index int) int64 {
	for len(primes.primes) <= index {
		primes.appendNextPrime()
	}
	return primes.primes[index]
}

// PrimeFactor returns a list of exponents, each corresponding to a prime number
func (primes *PrimeSieve) PrimeFactor(num int64) []int {
	exponents := []int{}
	for i := 0; num > 1; i++ {
		exponent := 0
		prime := primes.GetPrime(i)
		for num%prime == 0 {
			exponent++
			num /= prime
		}
		exponents = append(exponents, exponent)
	}
	return exponents
}
