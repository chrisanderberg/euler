// https://projecteuler.net/problem=4
// 
// A palindromic number reads the same both ways. The largest palindrome
// made from the product of two 2-digit numbers is 9009 = 91 x 99.
// 
// Find the largest palindrome made from the product of two 3-digit numbers.

import java.util.ArrayList;

class Euler4 {
    static boolean isPalendrome(int num) {
        ArrayList<Integer> digits = new ArrayList<Integer>();
        while (num > 0) {
            digits.add(num % 10);
            num /= 10;
        }
        boolean isPalendrome = true;
        for (int i = 0; i <= digits.size() / 2; i++) {
            if (digits.get(i) != digits.get(digits.size() - i - 1)) {
                isPalendrome = false;
                break;
            }
        }
        return isPalendrome;
    }

    public static void main(String[] args) {
        int largest = 0;
        for (int small = 100; small < 1000; small++) {
            for (int big = small + 1; big < 1000; big++) {
                if (isPalendrome(small * big) && small * big > largest) {
                    largest = small * big;
                }
            }
        }
        System.out.println(largest);
    }
}