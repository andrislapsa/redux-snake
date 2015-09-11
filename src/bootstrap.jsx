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

const mergedReducers = (state, action) => {
    state = reducer.initGame(state, action);

    state = reducer.spawnFood(state, action);

    state = reducer.grow(state, action);

    state = state.set(
        "mainLoopTimerID",
        reducer.startGame(state.get("mainLoopTimerID"), action)
    );

    state = state.set(
        "mainLoopTimerID",
        reducer.pauseGame(state.get("mainLoopTimerID"), action)
    );

    state = reducer.move(state, action);

    state = state.set(
        "direction",
        reducer.changeDirection(state.get("direction"), action)
    );

    state = state.set(
        "score",
        reducer.increaseScore(state.get("score"), action)
    );

    state = state.set(
        "cameraOffset",
        reducer.handleCameraChanges(state.get("cameraOffset"), action)
    );

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
