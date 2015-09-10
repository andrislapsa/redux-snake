import { createStore } from "redux";
import React from "react";
import { Provider } from "react-redux";
import { Map } from "immutable";

import App from "./App.jsx";
import { changeDirection } from "./reducers/snake";
import * as snakeUtil from "./utils/snakeUtil";

const mergedReducers = (appState, action) => {
	return appState.withMutations(state => {
		state.set(
			"direction", 
			changeDirection(state, action)
		);

		return state;
	});
};

const initialState = {
	direction: "down",
	snakeBody: snakeUtil.addMultipleSegments(
		{ x: 5, y: 5 },
		"down",
		5
	)
};
const store = createStore(mergedReducers, Map(initialState));
window.store = store;



let rootEl = document.querySelector("#root");
React.render(
	<Provider store={store}>
		{ () => <App /> }
	</Provider>,
	rootEl
);
