import { fromJS } from "immutable";

import * as snakeUtil from "./utils/snakeUtil";
import * as config from "../src/config/config";

export default fromJS({
    direction: "up",
    bufferedDirection: null, // used for better handling when multiple direction keystrokes are made in one tick
    playerId: "",
    snakeBody: snakeUtil.addMultipleSegments(
        {x: 0, y: 0},
        "up",
        5
    ),
    speed: config.SPEED, // ms per tick
    isGameStarted: false, // false when just initialized
    isGamePaused: true,
    score: 0,
    foodPosition: { x: 0, y: 0 },
    gridSize: config.GRID_SIZE,
    cameraOffsetZ: 30,
    directionChangedInTick: false,
    players: {},
    socket: null
});
