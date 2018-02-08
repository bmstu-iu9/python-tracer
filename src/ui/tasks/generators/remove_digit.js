import removeDigitSource from '../sources/remove_digit';

export default function () {
    let gen = () => ({
        a: Math.random() * 100000 >> 0,
        b: Math.random() * 10 >> 0
    });

    let isValid = (args) => {
        let first_digit = args.a;

        while (first_digit > 9) {
            first_digit = first_digit / 10 >> 0;
        }

        let arr = [1, 1, 2, 1, 3, 1],
            diflen = arr[Math.random() * 6 >> 0],
            regExp = new RegExp(args.b, 'g');

        return (args.a.toString().length - args.a.toString().replace(regExp, '').length) >= diflen &&
            first_digit !== args.b &&
            tracer(removeDigitSource, `remove_digit(${args.a}, ${args.b})`).split('\n').length < 35;
    };

    do {
        var args = gen();
    } while (!isValid(args));

    return `remove_digit(${args.a}, ${args.b})`;
}