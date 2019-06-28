/*
 * https://projecteuler.net/problem=10
 * 
 * The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.
 * 
 * Find the sum of all the primes below two million.
 */

const primeNumberSieve = require("./lib/primeNumberSieve");
const ps = primeNumberSieve();
let sum = 0;
for (let prime = ps.next().value; prime < 2000000; prime = ps.next().value) {
  sum += prime;
}

console.log(sum);