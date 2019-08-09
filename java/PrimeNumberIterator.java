import java.util.Iterator;

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
        return true;
    }
}