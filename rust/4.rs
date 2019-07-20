// https://projecteuler.net/problem=4
//
// A palindromic number reads the same both ways. The largest palindrome
// made from the product of two 2-digit numbers is 9009 = 91 × 99.
//
// Find the largest palindrome made from the product of two 3-digit
// numbers.

fn to_digits(num: u64) -> Vec<u64> {
    let mut digits: Vec<u64> = Vec::new();
    let mut remaining = num;

    while remaining != 0 {
        let digit = remaining % 10;
        remaining /= 10;
        digits.push(digit);
    }

    digits
}

fn is_palindrome<T>(v: &[T]) -> bool
where
    T: Eq,
{
    let forward = v.iter();
    let backward = v.iter().rev();
    forward.eq(backward)
}

fn main() {
    let mut largest: u64 = 0;
    for a in 100..1000 {
        // each 3 digit num
        for b in a..1000 {
            // each 3 digit num >= to the first
            let product = a * b;
            if product > largest {
                // only check larger products
                let digits = to_digits(product);
                if is_palindrome(&digits[..]) {
                    largest = product; // found a larger palindrome
                }
            }
        }
    }

    println!("{}", largest)
}
