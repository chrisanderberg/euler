// https://projecteuler.net/problem=4
// 
// A palindromic number reads the same both ways.
// The largest palindrome made from the product
// of two 2-digit numbers is 9009 = 91 x 99.
// 
// Find the largest palindrome made from the product of two 3-digit numbers.

// Convert a number into a list of digits.
List<int> digitize(int n) {
  var digits = <int>[];

  while (n > 0) {
    digits.add(n % 10);
    n ~/= 10;
  }

  return digits;
}

// Determine if a number is a palendrome.
bool isPalendrome(n) {
  // Digitize the number.
  var digits = digitize(n);

  // Get the digits in reversed order.
  var reversed = [...digits.reversed];

  // Compare the digits with the reversed digits.
  var result = true;

  for (var i = 0; i < digits.length && result; i++) {
    result = (digits[i] == reversed[i]);
  }

  return result;
}

// Solve the largest palendrome problem.
void main() {
  // Start by assuming the largest found is 0.
  var largest = 0;

  // For each 3 digit number.
  for (var i = 999; i > 99; i--) {
    for (var j = 999; (j > 99) && (i * j > largest); j--) {
      // Check if the product is a palendrome,
      // if so it's the new largest palendrome found.
      if (isPalendrome(i * j)) {
        largest = i * j;
      }
    }
  }

  print(largest);
}