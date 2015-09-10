import { MOVE, CHANGE_DIRECTION, DIE, GROW } from "../actions/actionTypes";
import * as snakeUtil from "../utils/snakeUtil";

export function move(state, action) {
	if (action.type === MOVE) {
		return state.set(
			"snakeBody", 
			snakeUtil.move(state.get("snakeBody"), state.get("direction"))
		);
	};

	return state;
}

export function changeDirection(state, action) {
	if (action.type === CHANGE_DIRECTION) {
		return action.direction;
	}

	return state;
}