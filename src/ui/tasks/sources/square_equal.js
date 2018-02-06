export default (
`def square_equal(a, b, c):
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
            return 'no roots'`
);