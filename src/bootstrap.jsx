import { createStore } from "redux";
import React from "react";
import { Provider } from "react-redux";
import { fromJS } from "immutable";

import App from "./App";
import initialState from "./initialState";

import { listenToKeys } from "./keyboardController";
import megaReducer from "./reducers/megaReducer";
import tick from "./tick";

const store = createStore(megaReducer, fromJS(initialState));
window.store = store;

listenToKeys(store);
tick(store);


let rootEl = document.querySelector("#root");
React.render(
    <Provider store={store}>
        { () => <App /> }
    </Provider>,
    rootEl
);
