import { Map } from "immutable";
import * as snakeUtil from "./utils/snakeUtil";

export default {
	direction: "down",
	snakeBody: snakeUtil.addMultipleSegments(
		{ x: 5, y: 5 },
		"down",
		5
	),
	mainLoopTimerID: undefined,
	foodPosition: { x: 23, y: 18 },
	gridSize: { width: 40, height: 40 }
};
