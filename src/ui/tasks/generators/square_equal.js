/*
 def gen_square_equal(roots_count):
     def genargs():
         if random.randint(0, 100) < 10:
            a = 0
         else:
            a = random.randint(-100, 100)

         b = random.randint(-100, 100)
         c = random.randint(-100, 100)
         return (a, b, c)

     def validargs(args, result, stdout):
         (a, b, c) = args
         if a != 0:
             D = b*b - 4*a*c
             if D > 0:
                 sqrtD = int_sqrt(D)
                 return (2 in roots_count and sqrtD
                     and 100 * (-b - sqrtD) % (2*a) == 0
                     and 100 * (-b + sqrtD) % (2*a) == 0)
             elif D == 0:
                 return (1 in roots_count and 100 * (-b) % (2*a) == 0)
             else:
                 return 0 in roots_count and D > -10000
         else:
             if b != 0:
                 return (1 in roots_count and 100 * (-c) % b == 0)
             else:
                 return 0 in roots_count
     return ('fall_mod1_square_equal.py', 'square_equal', genargs, validargs)
 */

export default function (rootsCount) {
    let gen = () => ({
        a: (Math.random() * 100 < 10) ? 0 : ((Math.random() * 200 - 100) >> 0),
        b: (Math.random() * 200 - 100) >> 0,
        c: (Math.random() * 200 - 100) >> 0
    });

    let isqrt = (n) => {
        for (let i = 0; i <= 100; i++) {
            if (i * i == n) {
                return i;
            }
        }

        return null;
    };

    let isValid = (args) => {

        let {a, b, c} = args, D = 0;

        if (a != 0) {
            D = b*b - 4*a*c;
            if (D > 0) {
                let sqrtD = isqrt(D);

                return rootsCount.indexOf(2) >= 0 && sqrtD &&
                    (100 * (-b - sqrtD) % (2*a) == 0) && (100 * (-b + sqrtD) % (2*a) == 0);
            } else if (D == 0) {
                return rootsCount.indexOf(1) >= 0 && (100 * -b % (2*a) == 0)
            } else {
                return rootsCount.indexOf(0) >= 0;
            }
        } else {
            if (b !== 0) {
                return rootsCount.indexOf(1) >= 0 && (100 * -c % b == 0)
            } else {
                return rootsCount.indexOf(0) >= 0;
            }
        }
    };

    do {
        var args = gen();
    } while (!isValid(args));

    return `square_equal(${args.a}, ${args.b}, ${args.c})`;
}