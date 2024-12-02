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
        let foundSave = false;
        let skippedLevelIndex = null;

        while(!foundSave && skippedLevelIndex < levels.length) {
            direction =  null

            const levelsWithoutSkipped = levels.filter((_, index) => index !== skippedLevelIndex)
            // if(skippedLevelIndex !== null) {
            //     console.log("check report", levels, levelsWithoutSkipped, skippedLevelIndex)
            // }

            const reportUnsafe = levelsWithoutSkipped.some((level, index, arr) => {
                if(index === 0) {
                    return false;
                }

                let lastLevel = arr[index-1];

                if(direction === null) {
                    direction = lastLevel < level ? INCREASING : DECREASING;
                    // console.log("computed direction", direction)
                }

                let safe = isSafe(lastLevel, level, direction)
                // console.log("levels", lastLevel, level, direction, safe)

                return !safe
            })
            foundSave = !reportUnsafe

            if(skippedLevelIndex === null) {
                skippedLevelIndex = 0
            } else {
                skippedLevelIndex++
            }
        }

        // console.log(foundSave ? "found safe":"did not found safe")

        if(foundSave) {
            safeCount++;
        }
    })

    console.log(safeCount)

    // wrong answers: 622, 578, 621, 583
}

function isSafe(level1, level2, direction) {
    const diff =  Math.abs(level2 - level1);
    const diffInRange = diff >= 1 && diff <= 3;
    if(!diffInRange) {
        return false;
    }

    if(direction === INCREASING) {
        return level2 > level1
    }

    return level2 < level1
}

main();
