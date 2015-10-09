import io from "socket.io-client";

import * as actions from "../actions/actionCreators";

export function createSocket() {
    return io(`${location.protocol}//${location.hostname}:3000`);
}

export function registerSocket(store, socket) {
    socket.on("connect", function(data) {
        socket.emit("join", store.getState().get("playerId"));
        store.dispatch(actions.initGame(socket));
    });

    socket.on("snakeBody", data => {
        store.dispatch(actions.updatePlayer(data.playerId, data.snakeBody));
    });

    socket.on("food", data => {
        store.dispatch(actions.updateFoodPosition(data));
    });
}
