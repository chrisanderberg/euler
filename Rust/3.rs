fn is_prime(primes: &Vec<u64>, num: u64) -> bool {
    for prime in primes.iter() {
        if num % prime == 0 {
            return false;
        }

        if num < prime * prime {
            return true;
        }
    }

    true
}

fn find_next_prime(primes: &mut Vec<u64>) -> u64 {
    let mut potential_prime = match primes.last() {
        Some(prime) => prime + 1,
        None => 2,
    };

    while !is_prime(primes, potential_prime) {
        potential_prime += 1;
    }

    primes.push(potential_prime);

    potential_prime
}

fn main() {
    let mut primes: Vec<u64> = vec![2];
    let mut composite: u64 = 600851475143;
    let mut largest_prime = 2;
    let mut cur_prime = 2;

    while cur_prime <= composite {
        while composite % cur_prime == 0 {
            composite /= cur_prime;
            largest_prime = cur_prime;
        }

        cur_prime = find_next_prime(&mut primes);
    }

    println!("{}", largest_prime);
}
