/*
https://projecteuler.net/problem=2

Each new term in the Fibonacci sequence is generated by adding the previous two terms.
By starting with 1 and 2, the first 10 terms will be:

1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...

By considering the terms in the Fibonacci sequence whose values do not exceed four million,
find the sum of the even-valued terms.
*/

// initialize variables
let sum = 0;
let fibA = 1;
let fibB = 2;

// loop until reached a Fibonacci number that exceeds 4,000,000
while(fibB <= 4000000) {
  // if the Fibonacci number is even, add it to the sum
  if(fibB % 2 == 0) {
    sum += fibB;
  }

  // get next Fibonacci number
  let old = fibA;
  fibA = fibB;
  fibB += old;
}

// output result
console.log(sum);
