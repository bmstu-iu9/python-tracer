import factorizeSource from '../sources/factorize';

export default function () {

    let gen = () => (Math.random() * 2000 >> 0);

    do {
        var arg = gen(),
            target = `factorize(${arg})`;
    } while (tracer(factorizeSource, target).split('\n').length >= 35);

    return target;
}