"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/*
https://projecteuler.net/problem=1

If we list all the natural numbers below 10 that are multiples of 3 or 5,
we get 3, 5, 6 and 9. The sum of these multiples is 23.

Find the sum of all the multiples of 3 or 5 below 1000.
*/
console.log(
// create an array of numbers 0 to 999, (exclude 1000 because 1000 is not "below" 1000)
[].concat(_toConsumableArray(Array(1000).keys()))

// keep just the ones divisible by 3 or 5,
.filter(function (n) {
    return n % 3 == 0 || n % 5 == 0;
})

// and sum them
.reduce(function (a, b) {
    return a + b;
}, 0));
