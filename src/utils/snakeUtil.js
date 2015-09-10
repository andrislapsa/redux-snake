import { Map, List } from "immutable";

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
			up: { x: -1, y: 0 },
			down: { x: 1, y: 0 },
			left: { x: 0, y: -1 },
			right: { x: 0, y: 1 }
		};

	return result.withMutations(position => {
		let diff = directionMap[direction];
		position.set("x", position.get("x") + diff.x);
		position.set("y", position.get("y") + diff.y);
		return position;
	});
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