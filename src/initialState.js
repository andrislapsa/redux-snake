import { Map } from "immutable";
import * as snakeUtil from "./utils/snakeUtil";

export default {
	direction: "down",
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
	cameraOffsetZ: 30
};
