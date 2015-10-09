import { Map } from "immutable";

import * as config from "../src/config/config";

export default {
    speed: config.SPEED, // ms per tick
    isGameStarted: false, // false when just initialized
    isGamePaused: true,
    foodPosition: { x: 20, y: 20 },
    gridSize: { width: 40, height: 40 },
    players: {

    },
    socket: null
};
