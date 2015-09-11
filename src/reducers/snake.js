import * as consts from "../actions/actionTypes";
import { Map, fromJS } from "immutable";
import * as snakeUtil from "../utils/snakeUtil";
import initialState from "../initialState";

export function move(state, action) {
	if (action.type === consts.MOVE) {
		return state.set(
			"snakeBody",
			snakeUtil.move(state.get("snakeBody"), state.get("direction"))
		);
	};

	return state;
}

export function changeDirection(state, action) {
	if (action.type === consts.CHANGE_DIRECTION) {
		return action.direction;
	}

	return state;
}

export function initGame(state, action) {
	if (action.type !== consts.INIT_GAME) {
		return state;
	}

	return state.merge(fromJS(initialState));
}

export function startGame(state, action) {
    if (action.type !== consts.START_GAME) {
        return state;
    }

    // Ticker is already running
    if (typeof state !== "undefined") {
        return state;
    }

	return window.setInterval(action.tickFn, 200);
}

export function grow(state, action) {
    if (action.type === consts.GROW) {
        return state.set(
            "snakeBody",
            snakeUtil.grow(state.get("snakeBody"), state.get("direction"))
        );
    };

    return state;
}

export function spawnFood(state, action) {
    if (action.type === consts.SPAWN_FOOD) {
        return state.set("foodPosition", snakeUtil.randomFoodPosition(
            state.get("snakeBody"),
            state.get("gridSize").get("width"),
            state.get("gridSize").get("height")
        ));
    }

    return state;
}

export function pauseGame(state, action) {
    if (action.type !== consts.PAUSE_GAME) {
        return state;
    }

    window.clearTimeout(state);

    // remove obsolete timerID from state
    return undefined;
}

export function increaseScore(state, action) {
    if (action.type !== consts.INCREASE_SCORE) {
        return state;
    }

    return state + action.amount;
}

export function handleCameraChanges(state, action) {
    if (action.type === consts.ADJUST_CAMERA) {
        return state.set(action.axis, action.offset);
        //console.log("aaa", state.toJSON(), action);
    }

    return state;
}