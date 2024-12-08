const {readFile} = require('node:fs/promises');
const {flat, arraySum} = require("../utils");

const main = async () => {
    const data = await readFile('input.txt', {encoding: 'utf8'});
    const lines = data.split("\n").filter(a => !!a);
    const results = await Promise.all(lines.map((line, index) => {
        return new Promise(resolve => {
            console.log(`${(index / lines.length * 100).toFixed(2)}%`)
            const parts = line.split(":");
            const target = parseInt(parts.shift());
            const numbers = parts[0].split(" ").filter(a => !!a).map(a => parseInt(a))

            const res = doSth(numbers, undefined)
            const matchedTarget = res.includes(target)

            resolve(matchedTarget ? target : 0)
        })
    }))

    console.log(arraySum(results))
}

const doSth = (numbers, res) => {
    // console.log(res, numbers)
    if (numbers.length === 0) {
        return res;
    }
    let currentNumber = numbers.shift();
    if(res === undefined) {
        res = currentNumber;
        currentNumber = numbers.shift()
    }
    const arrays = [
        doSth([...numbers], add(res, currentNumber)),
        // doSth([...numbers], sub(res, currentNumber)),
        doSth([...numbers], mult(res, currentNumber)),
        // doSth([...numbers], div(res, currentNumber)),
    ]

    return flat(arrays)
}

const add = (a, b) => a + b;
// const sub = (a, b) => a - b;
const mult = (a, b) => a * b;
// const div = (a, b) => a / b;

main();
