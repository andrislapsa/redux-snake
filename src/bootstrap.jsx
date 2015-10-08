import { createStore } from "redux";
import React from "react";
import { Provider } from "react-redux";
import { fromJS } from "immutable";

import App from "./App.jsx";
import * as reducer from "./reducers/snake";
import * as snakeUtil from "./utils/snakeUtil";
import initialState from "./initialState";
import * as actionCreators from "./actions/actionCreators";
import { listenToKeys } from "./keyboardController";
import megaReducer from "./megaReducer";
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
