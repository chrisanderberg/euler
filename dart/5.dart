// https://projecteuler.net/problem=5
//
// 2520 is the smallest number that can be divided by each of
// the numbers from 1 to 10 without any remainder.
//
// What is the smallest positive number that is evenly
// divisible by all of the numbers from 1 to 20?


// Calculate greatest common divisor using Euclid's algorithm.
// Both arguments must be integers greater than 0.
int gcd(int a, int b) {
  if (a < b) {
    return gcd(b, a);
  } else if (b == 0) {
    return a;
  } else {
    return gcd (b, a % b);
  }
}

// Calculate least common multiple.
// Both arguments must be integers greater than 0.
int lcm(int a, int b) {
  return (a * b) ~/ gcd(a, b);
}

void main() {
  final result = List<int>.generate(20, (i) => i + 1)
    .reduce(lcm);

  print(result);
}