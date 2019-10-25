package main

// https://projecteuler.net/problem=3
//
// The prime factors of 13195 are 5, 7, 13 and 29.
//
// What is the largest prime factor of the number 600851475143?

import (
	"fmt"

	"./primes"
)

func main() {
	sieve := primes.NewPrimeSieve()
	exponents := sieve.PrimeFactor(600851475143)
	largestFactor := sieve.GetPrime(len(exponents) - 1)
	fmt.Println(largestFactor)
}
