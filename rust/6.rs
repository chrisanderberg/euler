// https://projecteuler.net/problem=6
//
// The sum of the squares of the first tem natural numbers is,
// 1^2 + 2^2 + ... + 10^2 = 385
//
// The square of the sum of the first ten natural numbers is,
// (1 + 2 + ... + 10)^2 = 55^2 = 3025
//
// Hence the difference between the sum of the squares of the
// first ten natural numbers and the square of the sum is
// 3025 - 385 = 2640.
//
// Find the difference between the sum of the squares of the
// first one hundred natural numbers and the square of the sum.

fn main() {
    let sum = (1..101).fold(0, |acc, x| acc + x);
    let square_of_sum = sum * sum;
    let squares = (1..101).map(|x| x * x);
    let sum_of_squares = squares.fold(0, |acc, x| acc + x);
    println!("{}", square_of_sum - sum_of_squares);
}
