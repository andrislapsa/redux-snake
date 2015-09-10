import { MOVE, CHANGE_DIRECTION, DIE, GROW } from "./actionTypes";

export function move () {
	return {
		type: MOVE
	}
}

export function changeDirection (direction) {
	return {
		type: CHANGE_DIRECTION,
		direction
	}
}

export function die () {
	return {
		type: DIE
	}
}

export function grow () {
	return {
		type: GROW
	}
}