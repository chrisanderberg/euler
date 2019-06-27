/*
 * https://projecteuler.net/problem=3
 *
 * The prime factors of 13195 are 5, 7, 13 and 29.
 *
 * What is the largest prime factor of the number 600851475143?
 */

const primeNumberSieve = require("./lib/primeNumberSieve");

// Given an integer n, find n's largest prime factor.
function largestPrimeFactor(n) {
  let remainingProduct = n;
  let ps = primeNumberSieve();
  let curPrime;

  // n === 1 is the base case. We have an answer. Return the prime.
  while (remainingProduct !== 1) {
    curPrime = ps.next().value;

    while (remainingProduct % curPrime === 0) {
      remainingProduct /= curPrime;
    }
  }

  return curPrime;
}

// Run the solution and output the answer to the problem.
console.log(largestPrimeFactor(600851475143));
