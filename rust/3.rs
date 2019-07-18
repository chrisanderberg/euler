// https://projecteuler.net/problem=3
//
// The prime factors of 13195 are 5, 7, 13 and 29.
//
// What is the largest prime factor of the number 600851475143?

use std::fmt;

struct InsufficientPrimeList;

impl fmt::Display for InsufficientPrimeList {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "Prime list not large enough to check if number is prime")
    }
}

impl fmt::Debug for InsufficientPrimeList {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "Prime list not large enough to check if number is prime")
    }
}

fn is_prime(primes: &Vec<u64>, num: u64) -> Result<bool, InsufficientPrimeList> {
    for prime in primes.iter() {
        if num % prime == 0 {
            return Ok(false);
        }

        if num < prime * prime {
            return Ok(true);
        }
    }

    Err(InsufficientPrimeList {})
}

fn find_next_prime(primes: &mut Vec<u64>) -> u64 {
    let mut potential_prime = match primes.last() {
        Some(prime) => prime + 1,
        None => 2,
    };

    while !is_prime(primes, potential_prime).unwrap() {
        potential_prime += 1;
    }

    primes.push(potential_prime);

    potential_prime
}

fn prime_factor(composite: u64) -> Vec<(u64, u64)> {
    let mut composite = composite;
    let mut primes: Vec<u64> = vec![2];
    let mut cur_prime = 2;
    let mut prime_factors: Vec<(u64, u64)> = vec![];

    while cur_prime <= composite {
        let mut power: u64 = 0;

        while composite % cur_prime == 0 {
            composite /= cur_prime;
            power += 1;
        }

        if power > 0 {
            prime_factors.push((cur_prime, power));
        }

        cur_prime = find_next_prime(&mut primes);
    }

    prime_factors
}

fn main() {
    println!("{}", prime_factor(600851475143).last().unwrap().0);
}
