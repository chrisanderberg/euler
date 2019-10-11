def digitize(n, base=10):
    digits = []
    while n > 0:
        digits.append(n % base)
        n //= base
    digits.reverse()
    return digits



def digitsToNum(digits):
    num = 0
    for digit in digits:
        num *= 10
        num += digit
    return num