const {readFile} = require('node:fs/promises');
const {to2DArray, transpose2DArray, arrayUnique, reverse} = require("../utils");

const word = 'XMAS';

const main = async () => {
    const data = await readFile('input.txt', {encoding: 'utf8'});

    let lines = data.split("\n").filter(a => !!a);
    const charArray = to2DArray(data)
    const transposed = transpose2DArray(charArray)
    const columns = transposed.map(a => a.join(""))

    lines.push(...columns)

    let count = 0;
    lines.forEach((line, y) => {
        count += [...line.matchAll(/XMAS/g)].length
        count += [...reverse(line).matchAll(/XMAS/g)].length
    })

    charArray.forEach((line, y) => {
        line.forEach((char, x) => {
            if(char === word[0]) {
                count += checkDiagonals(charArray, x,y)
            }
        })
    })


    console.log(count)
}

const checkDiagonals = (arr, x,y) => {
    const count = [
        checkTopLeft(arr, x, y, 1),
        checkTopRight(arr, x, y, 1),
        checkBottomRight(arr, x, y, 1),
        checkBottomLeft(arr, x, y, 1)
    ].filter(el => el).length
    // console.log(`at ${x}|${y} found ${count}`, [
    //     checkTopLeft(arr, x, y, 1),
    //     checkTopRight(arr, x, y, 1),
    //     checkBottomRight(arr, x, y, 1),
    //     checkBottomLeft(arr, x, y, 1)
    // ])
    return count
}

const checkTopLeft = (arr, x, y, letterIndex) => {
    // reached end of word - match
    if(letterIndex >= word.length) {
        return true;
    }
    // reached end of matrix - no match
    if(x === 0 || y === 0) {
        return false;
    }
    const newX = x-1
    const newY = y-1

    // char did not match - no match
    if(arr[newY][newX] !== word[letterIndex]) {
        return false;
    }

    // continue with next letter
    return checkTopLeft(arr, newX, newY, letterIndex + 1)
}

const checkTopRight = (arr, x, y, letterIndex) => {
    if(letterIndex >= word.length) {
        return true;
    }
    if(x === arr[0].length - 1 || y === 0) {
        return false;
    }
    const newX = x+1
    const newY = y-1

    if(arr[newY][newX] !== word[letterIndex]) {
        return false;
    }

    return checkTopRight(arr, newX, newY, letterIndex + 1)
}

const checkBottomRight = (arr, x, y, letterIndex) => {
    if(letterIndex >= word.length) {
        return true;
    }
    if(x === arr[0].length - 1 || y === arr.length - 1) {
        return false;
    }
    const newX = x+1
    const newY = y+1

    if(arr[newY][newX] !== word[letterIndex]) {
        return false;
    }

    return checkBottomRight(arr, newX, newY, letterIndex + 1)
}

const checkBottomLeft = (arr, x, y, letterIndex) => {
    if(letterIndex >= word.length) {
        return true;
    }
    if(x === 0 || y === arr.length - 1) {
        return false;
    }
    const newX = x-1
    const newY = y+1

    if(arr[newY][newX] !== word[letterIndex]) {
        return false;
    }

    return checkBottomLeft(arr, newX, newY, letterIndex + 1)
}


main();
