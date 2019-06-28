/*
 * https://projecteuler.net/problem=9
 *
 * A Pythagorean triplet is a set of three natural numbers, a < b < c,
 * for which a^2 + b^2 = c^2.
 *
 * For example, 32 + 42 = 9 + 16 = 25 = 52.
 *
 * There exists exactly one Pythagorean triplet for which a + b + c = 1000.
 * Find the product abc.
 */

let resultFound = false;

function isTriplet(a, b, c) {
  return (a * a) + (b * b) === (c * c);
}

for (let c = 998; c > 333 && !resultFound; c--) {
  for (let b = 999 - c; b >= 1000 - c - b && !resultFound; b--) {
    let a = 1000 - c - b;
    if (isTriplet(a, b, c)) {
      // console.log(`${a}^2 + ${b}^2 = ${c}^2`);
      console.log(a * b * c);
      resultFound = true;
    }
  }
}