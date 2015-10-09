import socketIO from "socket.io";
import io from "socket.io-client";
import _ from "lodash";

import * as actions from "../../server/actions/actionCreators";

export function createSocket(server) {
    return socketIO(server);
}

export function registerSocket(store, io) {
    io.on("connection", _.partial(registerClient, store, io));
}

function registerClient(store, io, client) {
    console.log("Client connected...");

    client.on("join", playerId => {
        console.log("Client joined", playerId);
        store.dispatch(actions.playerJoined(playerId));
    });

    client.on("snakeBody", data => {
        io.emit("snakeBody", data);

        store.dispatch(actions.updateSnakeBody(data.playerId, data.snakeBody));
    });
};
