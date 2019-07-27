// https://projecteuler.net/problem=6
//
// The sum of the squares of the first tem natural numbers is,
// 1^2 + 2^2 + ... + 10^2 = 385
//
// The square of the sum of the first ten natural numbers is,
// (1 + 2 + ... + 10)^2 = 55^2 = 3025.
//
// Hence the difference between the sum of the squares of the
// first ten natural numbers and the square of the sum is
// 3025 - 385 = 2640.
//
// Find the difference between the sum of the squares of the
// first one hundred natural numbers and the square of the sum.

void main() {
  // Define "square", "sum", and "first100Nats".
  final square = (int x) => x * x;
  final sum = (int a, int b) => a + b;
  final first100Nats = List<int>.generate(100, (i) => i + 1);

  // Do the math.
  final sumOfSquares = first100Nats.map(square).reduce(sum);
  final squareOfSum = square(first100Nats.reduce(sum));
  final result = squareOfSum - sumOfSquares;

  print(result);
}