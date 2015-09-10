import * as snakeUtil from "./utils/snakeUtil";

export default {
	direction: "down",
	snakeBody: snakeUtil.addMultipleSegments(
		{ x: 5, y: 5 },
		"down",
		5
	)
};
