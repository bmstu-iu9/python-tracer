import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const tasks = [
    {
        source: `def gcd(x, y):
    if x < 0:
        x = -x
    if y < 0:
        y = -y
    if x == 0:
        return y
    while y != 0:
        rem = x % y
        x = y
        y = rem
    return x`,
        target: `gcd(-69, -46)`,
        maxAttempts: 5
    },

    {
        source: `def factorize(n):
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
    return res + str(n)`,
        target: `factorize(34)`,
        maxAttempts: 5
    },
    {
        source: `def hex(number):
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
    return res`,
        target: `hex(212)`,
        maxAttempts: 5
    },
    {
        source: `def join(sep, items):
    res = ''
    if len(items) > 0:
        res = str(items[0])
        items = items[1:]
        while len(items) > 0:
            res = res + sep + str(items[0])
            items = items[1:]
    return res`,
        target: `join([100, 200, 134, 24])`,
        maxAttempts: 5
    },
    {
        source: `def square_equal(a, b, c):
    if a != 0:
        D = b * b - 4 * a * c
        if D > 0:
            x1 = (-b - sqrt(D)) / (2*a)
            x2 = (-b + sqrt(D)) / (2*a)
            return [x1, x2]
        else:
            if D == 0:
                return [-b / (2 * a)]
            else:
                return []
    else:
        if b != 0:
            return [-c / b]
        else:
            return []`,
        target: `square_equal(2, 0, -1)`,
        maxAttempts: 5
    }
];

ReactDOM.render(
    <App tasks={tasks}/>,
    document.getElementById('app')
);