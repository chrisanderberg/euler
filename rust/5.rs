// https://projecteuler.net/problem=5
//
// 2520 is the smallest number that can be divided by each of the
// numbers from 1 to 10 without any remainder.
//
// What is the smallest positive number that is evenly divisible
// by all of the numbers from 1 to 20?

fn gcd(a: u64, b: u64) -> u64 {
    let mut a = a;
    let mut b = b;

    if b < a {
        let temp = b;
        b = a;
        a = temp;
    }

    while b != 0 {
        let temp = b;
        b = a % b;
        a = temp;
    }

    a
}

fn lcm(a: u64, b: u64) -> u64 {
    (a * b) / gcd(a, b)
}

fn main() {
    println!("{}", (1..21).fold(1, lcm));
}
