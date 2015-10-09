import io from "socket.io-client";

import * as actions from "../actions/actionCreators";

export function createSocket() {
    return io(`${location.protocol}//${location.hostname}:3000`);
}

export function registerSocket(store, socket) {
    socket.on("connect", function(data) {
        store.dispatch(actions.initGame(socket));
    });

    socket.on("serverTick", data => {
        store.dispatch(actions.updateOtherPlayers(data.players));
        // store.dispatch(actions.updateFoodPosition(data.food));
    });
}
