import * as consts from "./actionTypes";

export function playerJoined(playerId) {
	return {
		type: consts.PLAYER_JOINED,
        playerId
	};
}
