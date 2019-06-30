// The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.
// 
// Find the sum of all the primes below two million.

import "lib/prime_number_sieve.dart";

void main() {

  final result = primeNumberSieve()
    .takeWhile((p) => p < 2000000)
    .reduce((a, b) => a + b);

  print(result);
}