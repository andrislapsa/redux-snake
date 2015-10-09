import * as consts from "../actions/actionTypes";
import { Map, fromJS } from "immutable";
import * as snakeUtil from "../utils/snakeUtil";
import * as playerUtil from "../utils/playerUtil";
import initialState from "../initialState";

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

    let playerId = playerUtil.generateRandomId();

    action.socket.emit("join", playerId);

	return state.withMutations((state) => {
        return state
            .merge(fromJS(initialState))
            .set("playerId", playerId)
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

export function updatePlayer(state, action) {
    if (action.type === consts.UPDATE_PLAYER) {
        return state.set(
            action.playerId,
            fromJS({ snakeBody: action.snakeBody })
        );
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

export function updateFood(state, action) {
    if (action.type === consts.UPDATE_FOOD_POSITION) {
        return state.set("foodPosition", fromJS({ x: action.x, y: action.y }));
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

    let newState = state - action.amount;

    if (newState < 0) {
        return 0;
    }

    return newState;
}

export function decreaseCameraOffsetZ(state, action) {
    if (action.type === consts.DECREASE_CAMERA_Z) {
        return state - action.amount;
    }

    return state;
}

export function processSnakeBodyTick(state, action) {
    if (action.type !== consts.PROCESS_SNAKE_BODY_TICK) {
        return state;
    }

    let nextPosition = snakeUtil.getNextPosition(
            state.get("snakeBody").last(),
            state.get("direction")
        ),
        foodPosition = state.get("foodPosition"),
        ateFood = snakeUtil.positionsMatch(nextPosition, foodPosition),
        newSnakeBody;

    if (ateFood) {
        newSnakeBody = snakeUtil.grow(state.get("snakeBody"), state.get("direction"));
    } else {
        newSnakeBody = snakeUtil.move(state.get("snakeBody"), state.get("direction"));
    }

    return state.set("snakeBody", newSnakeBody);
}
