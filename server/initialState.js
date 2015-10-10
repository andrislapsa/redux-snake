import { fromJS } from "immutable";

import * as config from "../src/config/config";

export default fromJS({
    speed: config.SPEED, // ms per tick
    isGameStarted: false, // false when just initialized
    isGamePaused: true,
    foodPosition: { x: 20, y: 20 },
    gridSize: config.GRID_SIZE,
    players: {

    },
    socket: null
});
