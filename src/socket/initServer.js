import socketIO from "socket.io";
import io from "socket.io-client";
import _ from "lodash";

import * as serverLog from "../../server/log";
import * as actions from "../../server/actions/actionCreators";

export function createSocket(server) {
    return socketIO(server);
}

export function registerSocket(store, io) {
    io.on("connection", _.partial(registerClient, store, io));
}

function registerClient(store, io, client) {
    serverLog.info("Client connected...");

    client.on("join", playerId => {
        serverLog.info("Client joined", playerId);
        store.dispatch(actions.playerJoined(playerId));
    });

    client.on("snakeBody", data => {
        store.dispatch(actions.updatePlayerSnake(data.playerId, data.snakeBody, client));
    });
};
