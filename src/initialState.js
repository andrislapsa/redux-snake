import { Map } from "immutable";
import * as snakeUtil from "./utils/snakeUtil";

export default {
	direction: "down",
	bufferedDirection: null, // used for better handling when multiple direction keystrokes are made in one tick
	snakeBody: snakeUtil.addMultipleSegments(
		{ x: 15, y: 15 },
		"down",
		5
	),
	speed: 200, // ms per tick
	isGameStarted: false, // false when just initialized
	isGamePaused: false,
    score: 0,
	foodPosition: { x: 0, y: 0 },
	gridSize: { width: 40, height: 40 },
	cameraOffsetZ: 30,
	directionChangedInTick: false
};
