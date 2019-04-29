/*
The sum of the squares of the first tem natural numbers is,
1^2 + 2^2 + ... + 10^2 = 385

The square of the sum of the first ten natural numbers is,
(1 + 2 + ... + 10)^2 = 55^2 = 3025

Hence the difference between the sum of the squares of the
first ten natural numbers and the square of the sum is
3025 - 385 = 2640.

Find the difference between the sum of the squares of the
first one hundred natural numbers and the square of the sum.
*/

// define "square", "sum", and "first100Nats"
const square = x => x * x;
const sum = (a, b) => a + b;
const first100Nats = Array.from(new Array(100), (_, i) => i + 1);

// do the math
const sumOfSquares = first100Nats.map(square).reduce(sum);
const squareOfSum = square(first100Nats.reduce(sum));
const result = squareOfSum - sumOfSquares;

// output result
console.log(result);
