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

    mapArray.find((line, yIndex) => {
        x = line.indexOf("^");
        if(x !== -1) {
            y = yIndex
            return true
        }
        return false
    })

    const initialState = { x, y, direction: UP}
    let loopCounter = 0;


    mapArray.forEach((line, y) => {
        console.log(y);
        line.forEach((_, x) => {

            // console.log(`put additional obstacle at ${x}|${y}`)
            let state = JSON.parse(JSON.stringify(initialState));
            let previousStates = []
            let loop = false;

            while (state.x >= 0 && state.y >= 0 && state.x < mapArray[0].length && state.y < mapArray.length && loop === false) {
                previousStates.push(stateToString(state))
                state = move(mapArray, state, x, y)
                const stateString = stateToString(state)
                if(previousStates.includes(stateString)) {
                    // console.log(`######## loop found ###########`)
                    loop = true;
                    loopCounter++;
                }
            }
        })
    })

    console.log(loopCounter)
}

const move = (mapArray, state, additionalObstacleX, additionalObstacleY) => {
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

    if((x === additionalObstacleX && y === additionalObstacleY) || checkObstacle(mapArray, x, y)) {
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

const stateToString = state => `${state.x}|${state.y}|${state.direction}`

main();
