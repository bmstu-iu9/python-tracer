const source = `def gcd(x, y):
    if x < 0:
        x = -x
    if y < 0:
        y = -y
    while y != 0:
        rem = x % y
        x = y
        y = rem
    return x`;

function randomInt(min, max) {
    return (Math.random() * (max - min) >> 0) + min;
}



export default class gcdTask {
    static generate(bNoZero) {
        let genArgs = () => [randomInt(-100, 100), randomInt(-100, 100)],
            args = genArgs();

        if (bNoZero) {
            while (args[0] == 0 || args[1] == 0) {
                args = genArgs();
            }
        } else {
            while (args[0] !== 0 && args[1] !== 0) {
                args = genArgs();
            }
        }

        return {
            target: `gcd(${args.join(', ')})`,
            source: source,
            maxAttempts: 2
        }
    }
};