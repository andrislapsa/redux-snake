import * as consts from "../actions/actionTypes";
import { Map, fromJS } from "immutable";
import * as snakeUtil from "../utils/snakeUtil";
import * as playerUtil from "../utils/playerUtil";
import initialState from "../initialState";

export function move(state, action) {
	if (action.type === consts.MOVE) {
		return state.set(
			"snakeBody",
			snakeUtil.move(state.get("snakeBody"), state.get("direction"))
		);
	}

	return state;
}

export function changeDirection(state, action) {
    if (action.type === consts.CHANGE_DIRECTION) {
        return state.withMutations((state) => {
            return state
                .set("direction", action.direction)
                .set("directionChangedInTick", true);
        });
    }

    return state;
}

export function bufferDirection(state, action) {
    if (action.type === consts.BUFFER_DIRECTION) {
        return action.direction;
    }

    return state;
}

export function resetDirectionBufferFlag(state, action) {
	if (action.type === consts.RESET_DIRECTION_BUFFER_FLAG) {
		return false;
	}

	return state;
}

export function initGame(state, action) {
	if (action.type !== consts.INIT_GAME) {
		return state;
	}

	return state.withMutations((state) => {
        return state
            .merge(fromJS(initialState))
            .set("playerId", playerUtil.generateRandomId())
            .set("socket", action.socket);
    });
}

export function startGame(state, action) {
    if (action.type !== consts.START_GAME) {
        return state;
    }

    return state.withMutations((state) => {
        state.set("isGamePaused", false);
        state.set("isGameStarted", true);
    });
}

export function pauseGame(state, action) {
    if (action.type !== consts.PAUSE_GAME) {
        return state;
    }

    return true;
}

export function grow(state, action) {
    if (action.type === consts.GROW) {
        return state.set(
            "snakeBody",
            snakeUtil.grow(state.get("snakeBody"), state.get("direction"))
        );
    }

    return state;
}

export function updatePlayer(state, action) {
    if (action.type === consts.UPDATE_PLAYER) {
        return state.set(action.playerId, action.snakeBody);
    }

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

export function increaseScore(state, action) {
    if (action.type !== consts.INCREASE_SCORE) {
        return state;
    }

    return state + action.amount;
}

export function increaseSpeed(state, action) {
    if (action.type !== consts.INCREASE_SPEED) {
        return state;
    }

    return state - action.amount;
}

export function decreaseCameraOffsetZ(state, action) {
    if (action.type === consts.DECREASE_CAMERA_Z) {
        return state - action.amount;
    }

    return state;
}
