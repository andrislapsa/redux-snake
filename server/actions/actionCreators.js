import * as consts from "./actionTypes";

export function playerJoined(playerId) {
	return {
		type: consts.PLAYER_JOINED,
        playerId
	};
}

export function updateSnakeBody(playerId, snakeBody) {
	return {
		type: consts.UPDATE_SNAKE_BODY,
        playerId,
        snakeBody
	};
}
