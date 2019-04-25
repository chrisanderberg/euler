/*
2520 is the smallest number that can be divided by each of
the numbers from 1 to 10 without any remainder.

What is the smallest positive number that is evenly
divisible by all of the numbers from 1 to 20?
*/

/*
Calculate greatest common divisor using Euclid's algorithm.
Both arguments must be integers greater than 0.
*/
function gcd(a, b) {
  if (a < b) {
    return gcd(b, a);
  } else if (b === 0) {
    return a;
  } else {
    return gcd(b, a % b);
  }
}

/*
Calculate least common multiple.
Both arguments must be integers greater than 0.
*/
function lcm(a, b) {
  return a * b / gcd(a, b);
}

// Solve the problem
const oneToTwenty = Array.from(new Array(20), (_, i) => i + 1);
console.log(oneToTwenty.reduce(lcm));
