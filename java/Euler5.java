// https://projecteuler.net/problem=5
//
// 2520 is the smallest number that can be divided by each of
// the numbers from 1 to 10 without any remainder.
//
// What is the smallest positive number that is evenly
// divisible by all of the numbers from 1 to 20?

class Euler5 {
    // Calculate greatest common divisor using Euclid's algorithm.
    // Both arguments must be integers greater than 0.
    static long gcd(long a, long b) {
        if (a < b) {
            return gcd(b, a);
        } else if (b == 0) {
            return a;
        } else {
            return gcd(b, a % b);
        }
    }

    // Calculate least common multiple.
    // Both arguments must be integers greater than 0.
    static long lcm(long a, long b) {
        return (a * b) / gcd(a, b);
    }

    public static void main(String[] args) {
        long result = 1;
        for (long i = 1; i <= 20; i++) {
            result = lcm(result, i);
        }
        System.out.println(result);
    }
}