import { Map } from "immutable";
import * as snakeUtil from "./utils/snakeUtil";

export default {
	direction: "down",
	snakeBody: snakeUtil.addMultipleSegments(
		{ x: 15, y: 15 },
		"down",
		5
	),
	mainLoopTimerID: undefined,
    score: 0,
	foodPosition: { x: 23, y: 18 },
	gridSize: { width: 40, height: 40 }
};
