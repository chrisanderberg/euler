#!/usr/bin/python


def countLetters(n):
    letters = 0
    if n < 20:
        count = [0, 3, 3, 5, 4, 4, 3, 5, 5, 4, 3, 6, 6, 8, 8, 7, 7, 9, 8, 8]
        letters = count[n]
    elif n < 30:
        letters = 6 + countLetters(n-20)
    elif n < 40:
        letters = 6 + countLetters(n-30)
    elif n < 50:
        letters = 5 + countLetters(n-40)
    elif n < 60:
        letters = 5 + countLetters(n-50)
    elif n < 70:
        letters = 5 + countLetters(n-60)
    elif n < 80:
        letters = 7 + countLetters(n-70)
    elif n < 90:
        letters = 6 + countLetters(n-80)
    elif n < 100:
        letters = 6 + countLetters(n-90)
    elif n == 100:
        letters = 10
    elif n < 200:
        letters = 13 + countLetters(n-100)
    elif n == 200:
        letters = 10
    elif n < 300:
        letters = 13 + countLetters(n-200)
    elif n == 300:
        letters = 12
    elif n < 400:
        letters = 15 + countLetters(n-300)
    elif n == 400:
        letters = 11
    elif n < 500:
        letters = 14 + countLetters(n-400)
    elif n == 500:
        letters = 11
    elif n < 600:
        letters = 14 + countLetters(n-500)
    elif n == 600:
        letters = 10
    elif n < 700:
        letters = 13 + countLetters(n-600)
    elif n == 700:
        letters = 12
    elif n < 800:
        letters = 15 + countLetters(n-700)
    elif n == 800:
        letters = 12
    elif n < 900:
        letters = 15 + countLetters(n-800)
    elif n == 900:
        letters = 11
    elif n < 1000:
        letters = 14 + countLetters(n-900)
    else:
        letters = 11

    return letters


s = 0
for i in range(1, 1001):
    s += countLetters(i)
print(s)
