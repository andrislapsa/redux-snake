import { createStore } from "redux";
import React from "react";
import { Provider } from "react-redux";
import { Map } from "immutable";

import App from "./App.jsx";
import { changeDirection } from "./reducers/snake";

const mergedReducers = (appState, action) => {
	return appState.withMutations(state => {
		state.set(
			"direction", 
			changeDirection(state, action)
		);

		return state;
	});
};

const store = createStore(mergedReducers, Map());
window.store = store;



let rootEl = document.querySelector("#root");
React.render(
	<Provider store={store}>
		{ () => <App /> }
	</Provider>,
	rootEl
);
