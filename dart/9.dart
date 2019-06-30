// https://projecteuler.net/problem=9
//
// A Pythagorean triplet is a set of three natural numbers, a < b < c,
// for which a^2 + b^2 = c^2.
//
// For example, 32 + 42 = 9 + 16 = 25 = 52.
//
// There exists exactly one Pythagorean triplet for which a + b + c = 1000.
// Find the product abc.

final isTriplet = (a, b, c) => (a * a) + (b * b) == (c * c);

void main() {
  var resultFound = false;

  for (var c = 998; c > 333 && !resultFound; c--) {
    for (var b = 999 - c; b >= 1000 - c - b && !resultFound; b--) {
      var a = 1000 - c - b;
      if (isTriplet(a, b, c)) {
        print(a * b * c);
        resultFound = true;
      }
    }
  }
}