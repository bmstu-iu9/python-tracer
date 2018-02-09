export default function () {

    let arr = new Array((Math.random() * 3 >> 0) + 5).fill(0).map(() => Math.random() * 100 >> 0),
        splitter = ['-', ':', ',', '|', '#'][Math.random() * 5 >> 0];

    return `join("${splitter}", [${arr.join(', ')}])`
}