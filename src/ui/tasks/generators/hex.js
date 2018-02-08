export default function () {
    do {
        var number = Math.random() * 980 + 20 >> 0;
    } while (!/[a-f]/.test(number.toString(16)));

    return `hex(${number})`;
}