import Task from './Task';

const gcd = `def gcd(x, y):
    if x < 0:
        x = -x
    if y < 0:
        y = -y
    while y != 0:
        rem = x % y
        x = y
        y = rem
    return x`;

const hex = `def hex(number):
    if number == 0:
        return '0'
    res = ''
    while number > 0:
        digit = number % 16
        if digit <= 9:
            digit = str(digit)
        elif digit <= 13:
            if digit <= 11:
                if digit == 10:
                    digit = 'A'
                else:
                    digit = 'B'
            elif digit == 12:
                digit = 'C'
            else:
                digit = 'D'
        elif digit == 14:
            digit = 'E'
        else:
            digit = 'F'
        res = digit + res
        number = number // 16
    return res`;

const removeDigit = `def remove_digit(number, digit):
    res = 0
    power = 1
    while number > 0:
        cur_digit = number % 10
        if cur_digit != digit:
            res = res + cur_digit * power
            power = power * 10
        number = number // 10
    return res`;

const factorize = `def factorize(n):
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
    return res + str(n)`;

const squareEqual = `def square_equal(a, b, c):
    if a != 0:
        D = b*b - 4*a*c
        if D > 0:
            x1 = (-b - sqrt(D)) / (2*a)
            x2 = (-b + sqrt(D)) / (2*a)
            return str(x1) + ' and ' + str(x2)
        elif D == 0:
            return str(-b / (2*a))
        else:
            return 'no roots'
    else:
        if b != 0:
            return str(-c / b)
        else:
            return 'no roots'`;

export default {
    GCD: () => {

        let target = 'gcd(78, 45)';

        return new Task({
            _source: gcd,
            _target: target
        })
    },

    HEX: () => {
        let target = 'hex(217)';

        return new Task({
            _source: hex,
            _target: target
        })
    },

    REMOVE_DIGIT: () => {
        let target = 'remove_digit(166, 6)';

        return new Task({
            _source: removeDigit,
            _target: target
        })
    },

    FACTORIZE: () => {
        let target = 'factorize(75)';

        return new Task({
            _source: factorize,
            _target: target
        })
    },

    SQUARE_EQUAL: () => {
        let target = 'square_equal(49, 28, 53)';

        return new Task({
            _source: squareEqual,
            _target: target
        })
    }
};