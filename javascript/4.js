/*
 * https://projecteuler.net/problem=4
 *
 * A palindromic number reads the same both ways.
 * The largest palindrome made from the product
 * of two 2-digit numbers is 9009 = 91 × 99.
 *
 * Find the largest palindrome made from the product of two 3-digit numbers.
 */

// convert a number into an array of digits
function digitize(num) {
  let digits = [];

  while (num > 0) {
    digits.push(num % 10);
    num = Math.floor(num / 10);
  }

  return digits;
}

// determine if a number is a palendrome
function isPalendrome(num) {
  // digitize the number
  const digits = digitize(num);

  // get the digits in reverse
  const reversed = digits.slice().reverse();

  // compare the digits with the reversed digits
  let result = true;

  for (let i = 0; i < digits.length && result; i++) {
    result = (digits[i] === reversed[i]);
  }

  return result;
}

// solve the largest palendrome problem
function largestPalendrome() {

  // start by assuming the largest found is 0
  let largest = 0;

  // for each 3 digit number
  for (let i = 999; i > 99; i--) {

    /*
     * for every other 3 digit number that produces
     * a product with the first 3 digit number that's
     * larger than the largest palendrome found
     */
    for (let j = 999; j > 99 && i * j > largest; j--) {

      /*
       * check if the product is a palendrome,
       * if so it's the new largest palendrome found
       */
      if (isPalendrome(i * j)) {
        largest = i * j;
      }
    }
  }

  return largest;
}

console.log(largestPalendrome());
