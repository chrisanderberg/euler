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