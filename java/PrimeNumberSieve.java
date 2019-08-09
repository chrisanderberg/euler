import java.util.ArrayList;

/**
 * Lazily calculated iterable of prime numbers.
 */
class PrimeNumberSieve implements Iterable<Integer> {
    ArrayList<Integer> foundPrimes = new ArrayList<Integer>();

    public PrimeNumberSieve() {
        foundPrimes.add(2);
        foundPrimes.add(3);
    }

    public PrimeNumberIterator iterator() {
        return new PrimeNumberIterator(this);
    }

    /**
     * Find primes until enough have been found
     * to return the one the caller wants.
     */
    public Integer get(int index) {
        while (foundPrimes.size() <= index) {
            this.findNextPrime();
        }
        return foundPrimes.get(index);
    }

    /**
     * Append a new prime to the list of found primes.
     */
    void findNextPrime() {
        boolean foundPrime = false;
        int primeCandidate = foundPrimes.get(foundPrimes.size() - 1);
        // Loop until a prime is found. Must always find a prime.
        while (!foundPrime) {
            primeCandidate += 2;
            // Use previously found primes as possible factors.
            for (int factorCandidate: foundPrimes) {
                if (primeCandidate % factorCandidate == 0) {
                    // Found a factor, so not prime. Check next number.
                    break;
                }
                if (factorCandidate * factorCandidate > primeCandidate) {
                    // Composite numbers always have at least one factor less
                    // than their square root. Therefore this loop must break
                    // before this point when checking any composite number.
                    // Since it can't be composite, the number must be prime.
                    foundPrime = true;
                    break;
                }
            }
        }
        // Add the prime to the list.
        foundPrimes.add(primeCandidate);
    }
}