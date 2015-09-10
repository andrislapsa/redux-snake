import { createStore } from "redux";
import React from "react";
import { Provider } from "react-redux";
import { fromJS } from "immutable";

import App from "./App.jsx";
import { move, grow, changeDirection, startGame, pauseGame, initGame, spawnFood, increaseScore } from "./reducers/snake";
import * as snakeUtil from "./utils/snakeUtil";
import initialState from "./initialState";
import * as actionCreators from "./actions/actionCreators";
import { listenToKeys } from "./keyboardController";

const mergedReducers = (state, action) => {
    state = initGame(state, action);

    state = spawnFood(state, action);

    state = grow(state, action);

    state = state.set(
        "mainLoopTimerID",
        startGame(state.get("mainLoopTimerID"), action)
    );

    state = state.set(
        "mainLoopTimerID",
        pauseGame(state.get("mainLoopTimerID"), action)
    );

    state = move(state, action);

    state = state.set(
        "direction",
        changeDirection(state.get("direction"), action)
    );

    state = state.set("score", increaseScore(state.get("score"), action));

    return state;
};


const store = createStore(mergedReducers, fromJS(initialState));
window.store = store;

listenToKeys(store);


let rootEl = document.querySelector("#root");
React.render(
	<Provider store={store}>
		{ () => <App /> }
	</Provider>,
	rootEl
);
