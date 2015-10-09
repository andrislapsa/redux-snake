import * as consts from "./actionTypes";

export function changeDirection(direction) {
	return {
		type: consts.CHANGE_DIRECTION,
		direction
	};
}

export function bufferDirection(direction) {
	return {
		type: consts.BUFFER_DIRECTION,
		direction
	};
}

export function resetDirectionBufferFlag(direction) {
	return {
		type: consts.RESET_DIRECTION_BUFFER_FLAG,
		direction
	};
}

export function die() {
	return {
		type: consts.DIE
	};
}

export function updateOtherPlayers(data) {
	return {
		type: consts.UPDATE_PLAYERS,
		data
	};
}

export function initGame(socket) {
    return {
        type: consts.INIT_GAME,
        socket
    }
}

export function startGame() {
	return {
		type: consts.START_GAME
	};
}

export function pauseGame() {
	return {
		type: consts.PAUSE_GAME
	};
}

export function increaseScore(amount=1) {
	return {
		type: consts.INCREASE_SCORE,
        amount
	};
}

export function increaseSpeed(amount=5) {
	return {
		type: consts.INCREASE_SPEED,
        amount
	};
}

export function spawnFood() {
	return {
		type: consts.SPAWN_FOOD
	};
}

export function decreaseCameraOffsetZ(amount=0.5) {
	return {
		type: consts.DECREASE_CAMERA_Z,
		amount
	};
}

export function updateFoodPosition() {
	return {
		type: consts.UPDATE_FOOD_POSITION
	};
}

export function processSnakeBodyTick() {
    return {
        type: consts.PROCESS_SNAKE_BODY_TICK
    };
}
