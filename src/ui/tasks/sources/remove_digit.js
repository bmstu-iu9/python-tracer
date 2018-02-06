export default (
`def remove_digit(number, digit):
    res = 0
    power = 1
    while number > 0:
        cur_digit = number % 10
        if cur_digit != digit:
            res = res + cur_digit * power
            power = power * 10
        number = number // 10
    return res`
)