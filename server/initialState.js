import { Map } from "immutable";

export default {
    speed: 100, // ms per tick
    isGameStarted: false, // false when just initialized
    isGamePaused: true,
    foodPosition: { x: 20, y: 20 },
    gridSize: { width: 40, height: 40 },
    players: {

    },
    socket: null
};