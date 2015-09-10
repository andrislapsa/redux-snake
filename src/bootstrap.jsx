import { createStore } from "redux";
import React from "react";
import { Provider } from "react-redux";
import { Map } from "immutable";

import App from "./App.jsx";
import { move, changeDirection, initGame, startGame, pauseGame } from "./reducers/snake";
import * as snakeUtil from "./utils/snakeUtil";
import initialState from "./initialState";
import * as actionCreators from "./actions/actionCreators";

const mergedReducers = (appState, action) => {
	return appState.withMutations(state => {
		state = initGame(state, action);

		state.set(
			"mainLoopTimerID",
			startGame(state.get("mainLoopTimerID"), action)
		);

		state.set(
			"mainLoopTimerID",
			pauseGame(state.get("mainLoopTimerID"), action)
		);

		state = move(state, action);

		state.set(
			"direction",
			changeDirection(state.get("direction"), action)
		);

		return state;
	});
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
