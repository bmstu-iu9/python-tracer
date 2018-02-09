export default (
    `def factorize(n):
    res = ''
    while n > 2 and n % 2 == 0:
        res = res + '2*'
        n = n // 2
    d = 3
    while n > d:
        if n % d == 0:
            res = res + str(d) + '*'
            n = n // d
        else:
            d = d + 2
    return res + str(n)`
);