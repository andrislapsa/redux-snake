import { MOVE, CHANGE_DIRECTION, DIE, GROW, START_GAME, PAUSE_GAME, SPAWN_FOOD } from "./actionTypes";

export function move() {
	return {
		type: MOVE
	}
}

export function changeDirection(direction) {
	return {
		type: CHANGE_DIRECTION,
		direction
	}
}

export function die() {
	return {
		type: DIE
	}
}

export function grow() {
	return {
		type: GROW
	}
}


export function initGame() {
    return {
        type: INIT_GAME
    }
}

export function startGame(tickFn) {
	return {
		type: START_GAME,
        tickFn
	}
}

export function pauseGame() {
	return {
		type: PAUSE_GAME
	}
}
