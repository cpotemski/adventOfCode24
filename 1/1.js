const {readFile} = require('node:fs/promises');

const main = async () => {
    const data = await readFile('input.txt', {encoding: 'utf8'});
    const lines = data.split("\n").filter(a => !!a);

    const listA = [];
    const listB = [];
    let difference = 0;

    lines.forEach(line => {
        const parts = line.split("   ")
        listA.push(parseInt(parts[0]));
        listB.push(parseInt(parts[1]));
    })

    listA.sort()
    listB.sort()

    listA.forEach((val, index) => {
        const val2 = listB[index];
        difference += Math.abs(val2 - val)
    })
    console.log(difference)
}

main();
