const {readFile} = require('node:fs/promises');

const rules = {}

const main = async () => {
    const data = await readFile('input.txt', {encoding: 'utf8'});
    const lines = data.split("\n").filter(a => !!a);
    let readingRules = true;
    let sum = 0;

    lines.forEach(line => {
        if(readingRules && line.includes(",")) {
            readingRules = false;
        }
        if(readingRules) {
            const parts = line.split("|")
            addRule(parseInt(parts[0]), parseInt(parts[1]))
        } else {
            const numbers = line.split(",").map(str => parseInt(str))
            const isInvalid = numbers.some((number, currentIndex) => {
                const forbiddenNumbers = rules[number];
                if(forbiddenNumbers === undefined) {
                    return false;
                }
                const numbersBeforeThis = numbers.filter((_, index) => index < currentIndex)
                return numbersBeforeThis.some(numberBeforeThis => forbiddenNumbers.includes(numberBeforeThis))
            })

            if(isInvalid) {
                numbers.sort(customSort)
                sum += numbers[Math.floor(numbers.length / 2)]
            }
        }
    })

    console.log(sum)
}

const addRule = (a, b) => {
    if(rules[a] === undefined) {
        rules[a] = []
    }
    rules[a].push(b)
}

const customSort = (a, b) => {
    const rulesForA = rules[a];
    if(rulesForA === undefined) {
        return 0;
    }
    return rulesForA.includes(b) ? -1 : 0;
}

main();
