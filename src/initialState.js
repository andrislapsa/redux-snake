import { Map } from "immutable";
import * as snakeUtil from "./utils/snakeUtil";

export default {
	direction: "down",
	snakeBody: snakeUtil.addMultipleSegments(
		{ x: 15, y: 15 },
		"down",
		5
	),
	speed: 300, // ms per tick
	isGameStarted: false, // false when just initialized
	isGamePaused: false,
    score: 0,
	foodPosition: { x: 23, y: 18 },
	gridSize: { width: 40, height: 40 },
	cameraOffset: { x: 0, y: 0, z: 0 }
};
