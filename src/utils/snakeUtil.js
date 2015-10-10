import { Map, List, fromJS } from "immutable";

import * as config from "../config/config";

export function addMultipleSegments(currentPosition, direction, count) {
    let result = List(),
        nextPosition = currentPosition;

    return result.withMutations(body => {
        while (count--) {
            nextPosition = getNextPosition(nextPosition, direction);
            body.push(nextPosition);
        }

        return body;
    });
}

export function getNextPosition(currentPosition, direction) {
    let result = Map(currentPosition),
        directionMap = {
            up: {x: 0, y: 1},
            down: {x: 0, y: -1},
            left: {x: -1, y: 0},
            right: {x: 1, y: 0}
        },
        diff = directionMap[direction],
        newX = result.get("x") + diff.x,
        newY = result.get("y") + diff.y,
        gridSize = fromJS(config.GRID_SIZE), // TODO [refactor] use gridSize from state
        newPosition = result.withMutations(position => position.set("x", newX).set("y", newY));

    if (positionOutOfBounds(newPosition, gridSize)) {
        newPosition = teleport(newPosition, gridSize);
    }

    return newPosition;
}

export function positionOutOfBounds(position, gridSize) {
    if (position.get("x") < 0 || position.get("y") < 0) {
        return true;
    }

    if (position.get("x") > gridSize.get("width") || position.get("y") > gridSize.get("height")) {
        return true;
    }
}

export function teleport(position, gridSize) {
    return position.withMutations(position => {
        if (position.get("x") > gridSize.get("width")) {
            position.set("x", 0);
        }

        if (position.get("y") > gridSize.get("height")) {
            position.set("y", 0);
        }

        if (position.get("x") < 0) {
            position.set("x", gridSize.get("width"));
        }

        if (position.get("y") < 0) {
            position.set("y", gridSize.get("height"));
        }

        return position;
    });
}

export function eraseLastSegment(snakeBody) {
    return snakeBody.shift();
}

export function move(snakeBody, direction) {
    return grow(eraseLastSegment(snakeBody), direction);
}

export function grow(snakeBody, direction) {
    let newPosition = getNextPosition(
        snakeBody.last(), direction
    );

    return snakeBody.push(newPosition);
}

export function generateGrid(width = 40, height = 40) {
    let grid = [], x, y;

    for (x = 0; x < width; x++) {
        grid[x] = [];
        for (y = 0; y < height; y++) {
            grid[x][y] = " ";
        }
        grid[x].push("\n");
    }

    return grid;
}

export function isValidPosition(position) {
    return (
        position && position.get &&
        position.get("x") !== undefined && position.get("y") !== undefined
    );
}

export function positionsMatch(position1, position2) {
    return (
        isValidPosition(position1) &&
        isValidPosition(position2) &&
        position1.get("x") === position2.get("x") &&
        position1.get("y") === position2.get("y")
    )
}

export function positionInBody(position, snakeBody) {
    return snakeBody.find(section => {
        return positionsMatch(position, section);
    })
}

export function randomFoodPosition(snakeBody, width, height) {
    let result = randomPosition(width, height);

    if (positionInBody(result, snakeBody)) {
        return randomFoodPosition.apply(null, arguments);
    }

    return result;
}

export function randomPosition(width, height) {
    return Map({
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height)
    });
}

export function getHead(snakeBody) {
    if (!snakeBody || !snakeBody.count()) {
        return null;
    }

    return snakeBody.last();
}
