const {readFile} = require('node:fs/promises');
const {toIntArray} = require("../utils");

const INCREASING = "INCREASING";
const DECREASING = "DECREASING";

const main = async () => {
    const data = await readFile('input.txt', {encoding: 'utf8'});
    const lines = data.split("\n").filter(a => !!a);
    let safeCount = 0;

    lines.forEach(line => {
        const parts = line.split(" ")
        const levels = toIntArray(parts)
        let direction =  null

        console.log(levels);

        const unsafe = levels.some((level, index, arr) => {
            if(index === 0) {
                return false;
            }

            const lastLevel = arr[index - 1]
            console.log("levels", lastLevel, level)
            if(lastLevel === level) {
                console.log("same level as before - unsafe")
                return true;
            }

            if(direction === null) {
                direction = lastLevel < level ? INCREASING : DECREASING;
                console.log("computed direction", direction)
            } else if(direction === DECREASING) {
                if(level > lastLevel) {
                    console.log("not DECREASING", lastLevel, level)
                    return true;
                }
            } else {
                if(level < lastLevel) {
                    console.log("not INCREASING", lastLevel, level)
                    return true;
                }
            }

            const diff =  Math.abs(level - lastLevel);

            console.log("diff", diff)

            return !(diff >= 1 && diff <= 3);
        })

        console.log(unsafe ? "unsafe":"safe")

        if(!unsafe) {
            safeCount++;
        }
    })

    console.log(safeCount)
}

main();
