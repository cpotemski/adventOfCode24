const {readFile} = require('node:fs/promises');
const {to2DArray} = require("../utils");

const UP = 'UP';
const DOWN = 'DOWN';
const LEFT = 'LEFT';
const RIGHT = 'RIGHT';

const main = async () => {
    const data = await readFile('input.txt', {encoding: 'utf8'});
    const mapArray = to2DArray(data)
    let x = 0;
    let y = 0;
    const visitedTiles = {}

    mapArray.find((line, yIndex) => {
        x = line.indexOf("^");
        if(x !== -1) {
            y = yIndex
            return true
        }
        return false
    })

    let state = { x, y, direction: UP}

    while (state.x >= 0 && state.y >= 0 && x < mapArray[0].length && state.y < mapArray.length) {
        visitedTiles[`${state.x}|${state.y}`] = visitedTiles[`${state.x}|${state.y}`] ? visitedTiles[`${state.x}|${state.y}`] + 1 : 1
        state = move(mapArray, state)
        // console.log(state)
    }

    console.log(Object.keys(visitedTiles).length)
}

const move = (mapArray, state) => {
    let x, y, directionIfObstacle;
    switch (state.direction) {
        case UP:
            x = state.x;
            y = state.y - 1;
            directionIfObstacle = RIGHT
            break;
        case DOWN:
            x = state.x;
            y = state.y + 1;
            directionIfObstacle = LEFT
            break;
        case LEFT:
            x = state.x - 1;
            y = state.y;
            directionIfObstacle = UP
            break;
        case RIGHT:
            x = state.x + 1;
            y = state.y;
            directionIfObstacle = DOWN
            break;
    }

    if(checkObstacle(mapArray, x, y)) {
        return {
            x: state.x,
            y: state.y,
            direction: directionIfObstacle
        }
    }

    return {
        x,
        y,
        direction: state.direction
    }
}

const checkObstacle = (mapArray, x, y) => {
    if(x >= 0 && y >= 0 && x < mapArray[0].length && y < mapArray.length) {
        return mapArray[y][x] === "#"
    }
    return false
}

main();
