/*
https://projecteuler.net/problem=1

If we list all the natural numbers below 10 that are multiples of 3 or 5,
we get 3, 5, 6 and 9. The sum of these multiples is 23.

Find the sum of all the multiples of 3 or 5 below 1000.
*/

// create an array of numbers 0 to 999,
// excluding 1000 because 1000 is not "below" 1000.
const nums = [...Array(1000).keys()];

// return true if a number is divisible by 3 or 5
const multipleOfThreeOrFive = n => (n % 3 === 0) || (n % 5 === 0);

// function for finding the sum of 2 numbers
const sum = (a, b) => a + b;

console.log(
  nums.filter(multipleOfThreeOrFive)
  .reduce(sum));
