// https://projecteuler.net/problem=3
//
// The prime factors of 13195 are 5, 7, 13 and 29.
//
// What is the largest prime factor of the number 600851475143?

class Euler3 {
    public static void main(String[] args) {
        PrimeNumberSieve primes = new PrimeNumberSieve();
        long num = 600851475143L;
        Integer largestPrime = null;
        for (int prime: primes) {
            while (num % prime == 0) {
                num /= prime;
            }
            if (num == 1) {
                largestPrime = prime;
                break;
            }
        }
        System.out.println(largestPrime);
    }
}