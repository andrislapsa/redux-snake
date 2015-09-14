import * as consts from "./actionTypes";

export function move() {
	return {
		type: consts.MOVE
	}
}

export function changeDirection(direction) {
	return {
		type: consts.CHANGE_DIRECTION,
		direction
	}
}

export function die() {
	return {
		type: consts.DIE
	}
}

export function grow() {
	return {
		type: consts.GROW
	}
}


export function initGame() {
    return {
        type: consts.INIT_GAME
    }
}

export function startGame() {
	return {
		type: consts.START_GAME
	}
}

export function pauseGame() {
	return {
		type: consts.PAUSE_GAME
	}
}

export function increaseScore(amount=1) {
	return {
		type: consts.INCREASE_SCORE,
        amount
	}
}

export function spawnFood() {
	return {
		type: consts.SPAWN_FOOD
	}
}

export function adjustCamera(axis, offset) {
	return {
		type: consts.ADJUST_CAMERA,
		axis,
		offset
	}
}
