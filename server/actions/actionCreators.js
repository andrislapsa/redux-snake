import * as consts from "./actionTypes";

export function playerJoined(playerId) {
	return {
		type: consts.PLAYER_JOINED,
        playerId
	};
}

export function updatePlayerSnake(playerId, snakeBody, client) {
	return {
		type: consts.UPDATE_PLAYER_SNAKE,
        playerId,
        snakeBody,
        client
	};
}

export function cleanupStalledPlayers() {
	return {
		type: consts.CLEANUP_STALLED_PLAYERS
	};
}
