import { MOVE, CHANGE_DIRECTION, DIE, GROW } from "../actions/actionTypes";

export function changeDirection (state, action) {
	return action.direction;
}
