import gcdSource from '../sources/gcd';

export default function (noZero) {

    function gen() {
        return {
            a: Math.random() * 200 - 100 >> 0,
            b: Math.random() * 200 - 100 >> 0
        }
    }

    function gcd(args) {
        if (!args.b) {
            return Math.abs(args.a);
        }

        return gcd({a: Math.abs(args.b), b: Math.abs(args.a) % Math.abs(args.b)});
    }

    let args, target, solution, res;

    if (noZero) {
        do {
            args = gen();
            target = `gcd(${args.a}, ${args.b})`;
            res = gcd(args);
            solution = tracer(gcdSource, target).split('\n');
        } while (!(args.a && args.b) || res === 1 || solution.length < 20 || solution.length > 30);
    } else {
        do {
            args = gen();
            res = gcd(args);
            target = `gcd(${args.a}, ${args.b})`;
        } while (args.a && args.b || args.a === args.b || res === 1);
    }

    return target;
}