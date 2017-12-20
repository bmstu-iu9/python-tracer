const source = `def hex(number):
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

function randomInt(min, max) {
    return (Math.random() * (max - min) >> 0) + min;
}

export default class hexTask {
    static generate() {
        let genArgs = () => [randomInt(20, 1000)],
            args = genArgs();

        return {
            target: `hex(${args.join(', ')})`,
            source: source
        }
    }
};