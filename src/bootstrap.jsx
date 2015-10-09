import { createStore } from "redux";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { fromJS } from "immutable";

import App from "./components/App";
import initialState from "./initialState";
import { createSocket, registerSocket } from "./socket/initSocket";
import { listenToKeys } from "./keyboardController";
import megaReducer from "./reducers/megaReducer";
import tick from "./tick";

const store = createStore(megaReducer, fromJS(initialState));
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
