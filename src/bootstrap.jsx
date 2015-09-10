import { createStore } from "redux";
import React from "react";
import { Provider } from "react-redux";
import { Map } from "immutable";

import App from "./App.jsx";
import { move, changeDirection, startGame } from "./reducers/snake";
import * as snakeUtil from "./utils/snakeUtil";
import initialState from "./initialState";
import * as actionCreators from "./actions/actionCreators";

const mergedReducers = (appState, action) => {
	return appState.withMutations(state => {
		state = startGame(state, action);

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
	rootEl,
	() => {
		console.log("start");
		store.dispatch(actionCreators.startGame());
	}
);
