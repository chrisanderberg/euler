library prime_number_sieve;

Iterable<int> primeNumberSieve() sync* {
  int nextPrime(List<int> savedPrimes) {
    // If the list of primes is empty, the first prime is 2.
    // Add it to the list and return it.
    if (savedPrimes.length == 0) {
      savedPrimes..add(2);
      return 2;
    }

    // If the array includes just one prime (should be two),
    // the second prime is 3. Add it to the list and return it.
    if (savedPrimes.length == 1) {
      savedPrimes.add(3);
      return 3;
    }

    // The first number to check for primeness will be 2 more
    // than the last prime (sticking to odd numbers).
    var nextPrimeCandidate = savedPrimes[savedPrimes.length - 1] + 2;

    // Once a new prime (the next one after the last prime given
    // in the primes array) is found, store it in this variable.
    int newPrime;

    // While a new prime has not been found...
    while (newPrime == null) {
      // For each prime in the primes list starting at the beginning...
      for (var i = 0; i < savedPrimes.length; i++) {
        var prime = savedPrimes[i];

        // If the prime is too big to be a factor of the prime candidate,
        // then a new prime has been found.
        if (prime * prime > nextPrimeCandidate) {
          newPrime = nextPrimeCandidate;
          break;
        }

        // If the prime is a factor of the prime candidate, then the prime
        // candidate can't be prime. Move on to the next number.
        else if (nextPrimeCandidate % prime == 0) {
          break;
        }
      }

      // The next prime candidate will be two more than the last one
      // (sticking to odd numbers).
      nextPrimeCandidate += 2;
    }

    // Found a new prime! It's the only way to exit the above while loop.
    // Add it to the list, and then return it.
    savedPrimes.add(newPrime);
    return newPrime;
  }

  // Start with not calculated primes.
  var savedPrimes = <int>[];

  while (true) {
    yield nextPrime(savedPrimes);
  }
}