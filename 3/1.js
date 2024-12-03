const {readFile} = require('node:fs/promises');
const {arraySum} = require("../utils");

const main = async () => {
    const data = await readFile('input.txt', {encoding: 'utf8'});
    const expression = /mul\(\d+,\d+\)/g
    const operations = [...data.matchAll(expression)].map(el => el[0])
    const products = operations.map(str => {
        const strippedDown = str.replaceAll("mul(", "").replaceAll(")", "")
        const parts = strippedDown.split(",")
        return parseInt(parts[0]) * parseInt(parts[1])
    })

    console.log(arraySum(products))
}

main();
