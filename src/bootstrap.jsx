import { createStore } from "redux";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./components/App";
import initialState from "./initialState";
import { createSocket, registerSocket } from "./socket/initClient";
import { listenToKeys } from "./keyboardController";
import megaReducer from "./reducers/megaReducer";
import tick from "./tick";

const store = createStore(megaReducer, initialState);
window.store = store;


registerSocket(store, createSocket());
listenToKeys(store);
tick(store);


let rootEl = document.querySelector("#root");
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootEl
);
