import gcdSource from '../sources/gcd';

export default function (noZero) {

    function gen() {
        return {
            a: Math.random() * 200 - 100 >> 0,
            b: Math.random() * 200 - 100 >> 0
        }
    }

    let args = gen(),
        target = `gcd(${args.a}, ${args.b})`,
        solution = tracer(gcdSource, target).split('\n');

    if (noZero) {
        while (!(args.a && args.b) || solution.length < 20 || solution.length > 30) {
            args = gen();
            target = `gcd(${args.a}, ${args.b})`;
            solution = tracer(gcdSource, target).split('\n');
        }
    } else {
        while (args.a && args.b || (args.a === args.b)) {
            args = gen();
            target = `gcd(${args.a}, ${args.b})`;
        }
    }

    return target;
}