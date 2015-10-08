import { createStore } from "redux";
import React from "react";
import { Provider } from "react-redux";
import { fromJS } from "immutable";
import io from "socket.io-client";

import App from "./App";
import initialState from "./initialState";

import { listenToKeys } from "./keyboardController";
import megaReducer from "./reducers/megaReducer";
import tick from "./tick";
import * as actions from "./actions/actionCreators"

const store = createStore(megaReducer, fromJS(initialState));
window.store = store;

const socket = io(`${location.protocol}//${location.hostname}:3000`);

socket.on("connect", function(data) {
    socket.emit("join", store.getState().get("playerId"));
    store.dispatch(actions.initGame(socket));
    store.dispatch(actions.startGame());
});

socket.on("snakeBody", data => {
    store.dispatch(actions.updatePlayer(data.playerId, data.snakeBody));
});


listenToKeys(store);
tick(store);


let rootEl = document.querySelector("#root");
React.render(
    <Provider store={store}>
        { () => <App /> }
    </Provider>,
    rootEl
);
