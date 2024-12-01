const {readFile} = require('node:fs/promises');

const main = async () => {
    const data = await readFile('input.txt', {encoding: 'utf8'});
    const lines = data.split("\n").filter(a => !!a);

    const listA = [];
    const listB = [];
    const scoreMap = {}
    let lastVal = null;
    let sum = 0;


    lines.forEach(line => {
        const parts = line.split("   ")
        listA.push(parseInt(parts[0]));
        listB.push(parseInt(parts[1]));
    })

    listA.sort()
    listB.sort()

    listB.forEach(val => {
        if(lastVal === val) {
            scoreMap[val] ++;
            lastVal = val;
            return;
        }

        scoreMap[val] = 1
        lastVal = val;
    })

    listA.forEach(val => {
        if(scoreMap[val] === undefined) {
            return
        }
        sum += val * scoreMap[val];
    })

    console.log(sum)
}

main();
