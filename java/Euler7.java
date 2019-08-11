// https://projecteuler.net/problem=7
//
// By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13,
// we can see that the 6th prime is 13.
//
// What is the 10 001st prime number?

class Euler7 {
    public static void main(String[] args) {
        PrimeNumberSieve primes = new PrimeNumberSieve();
        System.out.println(primes.get(10000));
    }
}