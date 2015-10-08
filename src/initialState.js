import { Map } from "immutable";
import * as snakeUtil from "./utils/snakeUtil";

export default {
    direction: "up",
    bufferedDirection: null, // used for better handling when multiple direction keystrokes are made in one tick
    playerId: "",
    snakeBody: snakeUtil.addMultipleSegments(
        {x: 0, y: 0},
        "up",
        5
    ),
    speed: 100, // ms per tick
    isGameStarted: false, // false when just initialized
    isGamePaused: false,
    score: 0,
    foodPosition: {x: 0, y: 0},
    gridSize: {width: 40, height: 40},
    cameraOffsetZ: 30,
    directionChangedInTick: false,
    players: {
        "pdfdsfsdfsdflayerIdMockedData": {
            snakeBody: JSON.parse('[{"x":22,"y":37},{"x":23,"y":37},{"x":24,"y":37},{"x":25,"y":37},{"x":25,"y":36},{"x":25,"y":35},{"x":25,"y":34},{"x":25,"y":33},{"x":25,"y":32},{"x":25,"y":31},{"x":25,"y":30},{"x":25,"y":29},{"x":25,"y":28},{"x":25,"y":27},{"x":25,"y":26},{"x":25,"y":25},{"x":25,"y":24},{"x":25,"y":23},{"x":25,"y":22},{"x":25,"y":21},{"x":25,"y":20}]')
        }
    },
    socket: null
};
