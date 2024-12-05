const {readFile} = require('node:fs/promises');
const {to2DArray} = require("../utils");

const main = async () => {
    const data = await readFile('input.txt', {encoding: 'utf8'});
    const charArray = to2DArray(data)
    let count = 0;

    charArray.forEach((line, y) => {
        if(y === 0 || y === charArray.length - 1) {
            return;
        }
        line.forEach((char, x) => {
            if(x === 0 || x === line.length - 1) {
                return;
            }
            if(char === 'A') {
                const topLeft = charArray[y-1][x-1];
                const topRight = charArray[y-1][x+1];
                const bottomRight = charArray[y+1][x+1];
                const bottomLeft = charArray[y+1][x-1];

                const diagonal1 = topLeft === 'M' && bottomRight === 'S' || topLeft === 'S' && bottomRight === 'M'
                const diagonal2 = bottomLeft === 'M' && topRight === 'S' || bottomLeft === 'S' && topRight === 'M'

                if(diagonal1 && diagonal2) {
                    count++
                }
            }
        })
    })

    console.log(count)
}


main();
