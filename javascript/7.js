/*
https://projecteuler.net/problem=7

By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13,
we can see that the 6th prime is 13.

What is the 10 001st prime number?
*/

const primeNumberSieve = require("./lib/primeNumberSieve");

// initialize the prime number sieve
let ps = primeNumberSieve();
let curPrime;

// get 10001 primes from the prime number sieve
for (let i = 1; i <= 10001; i++) {
  curPrime = ps.next().value;
}

// display the last (10 001st) prime from the sieve
console.log(curPrime);
