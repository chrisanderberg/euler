/*
https://projecteuler.net/problem=3

The prime factors of 13195 are 5, 7, 13 and 29.

What is the largest prime factor of the number 600851475143 ?
*/

// Given an ordered array of all primes up to a limit,
// find the next prime, add it to the array, and return it.
function nextPrime(primes) {
  // If the array of primes is empty, the first prime is 2.
  // Add it to the array and return it.
  if (primes.length === 0) {
    primes.push(2);
    return 2;
  }

  // If the array includes just one prime (should be two),
  // the second prime is 3. Add it to the array and return it.
  if (primes.length === 1 ) {
    primes.push(3);
    return 3;
  }

  // The first number to check for primeness will be 2 more than the last prime
  // (sticking to odd numbers).
  let nextPrimeCandidate = primes[primes.length - 1] + 2;

  // Once a new prime (the next one after the last prime given in the primes array)
  // is found, store it in this variable.
  let newPrime = 0;

  // While a new prime has not been found...
  while (!newPrime) {
    // For each prime in the primes array starting at the beginning...
    for (let i = 0; i < primes.length; i++) {
      let prime = primes[i];

      // If the prime is too big to be a factor of the prime candidate,
      // then a new prime has been found.
      if (prime * prime > nextPrimeCandidate) {
        newPrime = nextPrimeCandidate;
        break;
      }

      // If the prime is a factor of the prime candidate, then the prime
      // candidate can't be prime. Time to move on to the next number.
      else if (nextPrimeCandidate % prime === 0) {
        break;
      }
    }

    // The next prime candidate will be two more than the last one
    // (sticking to odd numbers).
    nextPrimeCandidate += 2;
  }

  // We have a new prime! It's the only way to exit the above while loop.
  // Add it to the array, and then return it.
  primes.push(newPrime);
  return newPrime;
}

// We start off with no calculated primes.
let primes = [];

// Given a number n and a prime number (assuming n is not divisible by smaller primes),
// find n's largest prime factor.
function largestPrimeFactor(n, prime) {
  // n == 1 is the base case. We have an answer. Return the prime.
  if (n === 1) {
    return prime;
  }

  // If the prime is a factor of n, we can redefine the problem as finding
  // the largest prime factor of n / prime.
  else if (n % prime === 0) {
    return largestPrimeFactor(n / prime, prime);
  }

  // The previous two conditions have failed. We neither have the final result,
  // nor is the current prime a factor of n. Time to move onto the next prime.
  else {
    return largestPrimeFactor(n, nextPrime(primes));
  }
}

// Run the solution and output the answer to the problem.
console.log(largestPrimeFactor(600851475143, nextPrime(primes)));
