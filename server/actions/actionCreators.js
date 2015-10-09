import * as consts from "./actionTypes";

export function playerJoined(playerId) {
	return {
		type: consts.PLAYER_JOINED,
        playerId
	};
}

export function updatePlayerSnake(playerId, snakeBody) {
	return {
		type: consts.UPDATE_PLAYER_SNAKE,
        playerId,
        snakeBody
	};
}

export function cleanupStalledPlayers() {
	return {
		type: consts.CLEANUP_STALLED_PLAYERS
	};
}
