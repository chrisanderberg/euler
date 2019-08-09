import java.util.ArrayList;

class PrimeNumberSieve implements Iterable<Integer> {
    ArrayList<Integer> primes = new ArrayList<Integer>();

    public PrimeNumberSieve() {
        primes.add(2);
    }

    public PrimeNumberIterator iterator() {
        return new PrimeNumberIterator(this);
    }

    public Integer get(int index) {
        while (primes.size() <= index) {
            this.findNextPrime();
        }
        return primes.get(index);
    }

    void findNextPrime() {
        boolean foundPrime = false;
        int primeCandidate = primes.get(primes.size() - 1);
        while (!foundPrime) {
            primeCandidate++;
            for (int prime: primes) {
                if (primeCandidate % prime == 0) {
                    break;
                }
                if (prime * prime > primeCandidate) {
                    foundPrime = true;
                }
            }
        }
        primes.add(primeCandidate);
    }
}