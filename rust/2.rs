// https://projecteuler.net/problem=2
//
// Each new term in the Fibonacci sequence is generated by adding the previous two terms.
// By starting with 1 and 2, the first 10 terms will be:
//
// 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...
//
// By considering the terms in the Fibonacci sequence whose values do not exceed four million,
// find the sum of the even-valued terms.

fn main() {
    let mut sum = 0;
    let mut prev = 0;
    let mut curr = 1;

    while curr < 4_000_000 {
        if curr % 2 == 0 {
            sum += curr;
        }

        let next = prev + curr;
        prev = curr;
        curr = next;
    }

    println!("{}", sum);
}
