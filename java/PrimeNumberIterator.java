import java.util.Iterator;

/**
 * Infinite iterator over the prime numbers using a prime number sieve that
 * lazily calculates them on demand.
 */
class PrimeNumberIterator implements Iterator<Integer> {
    PrimeNumberSieve primes;
    int curIndex = 0;

    public PrimeNumberIterator(PrimeNumberSieve primes) {
        this.primes = primes;
    }

    public Integer next() {
        return this.primes.get(curIndex++);
    }

    public boolean hasNext() {
        // Infinite iterators always have a next value.
        return true;
    }
}