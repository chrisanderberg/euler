// https://projecteuler.net/problem=3
// 
// The prime factors of 13195 are 5, 7, 13 and 29.
// 
// What is the largest prime factor of the number 600851475143?

import "lib/prime_number_sieve.dart";

// Given an integer n, find n's largest prime factor
int largestPrimeFactor(int n) {
  var remainingProduct = n;
  var ps = primeNumberSieve();
  int curPrime;

  // n == 1 is the base case, in which an answer has been found.
  // Return the prime.
  for (curPrime in ps) {
    while (remainingProduct % curPrime == 0) {
      remainingProduct ~/= curPrime;
    }

    if (remainingProduct == 1) break;
  }

  return curPrime;
}

// Print the solution to the problem
void main() {
  print(largestPrimeFactor(600851475143));
}