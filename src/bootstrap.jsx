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

    state = reducer.startGame(state, action);

    state = state.set(
        "isGamePaused",
        reducer.pauseGame(state.get("isGamePaused"), action)
    );

    state = reducer.move(state, action);

    state = reducer.changeDirection(state, action);

    state = state.set(
        "bufferedDirection",
        reducer.bufferDirection(state.get("bufferedDirection"), action)
    );

    state = state.set(
        "directionChangedInTick",
        reducer.resetDirectionBufferFlag(state.get("directionChangedInTick"), action)
    );

    state = state.set(
        "score",
        reducer.increaseScore(state.get("score"), action)
    );

    state = state.set(
        "speed",
        reducer.increaseSpeed(state.get("speed"), action)
    );

    state = state.set(
        "cameraOffsetZ",
        reducer.decreaseCameraOffsetZ(state.get("cameraOffsetZ"), action)
    );

    return state;
};


const store = createStore(mergedReducers, fromJS(initialState));
window.store = store;


function tick(store) {
    const dispatch = store.dispatch;
    let state = store.getState();

    // Create next tick
    setTimeout(() => { tick(store) }, state.get("speed"));

    if (!state.get("isGameStarted") || state.get("isGamePaused")) {
        return;
    }

    let snakeBody = state.get("snakeBody"),
        nextPosition = snakeUtil.getNextPosition(
            snakeBody.last(),
            state.get("direction")
        ),
        foodPosition = state.get("foodPosition");

    // might be useful to have more generic actions, such as - prepareForNextTick
    dispatch(actionCreators.resetDirectionBufferFlag());

    if (snakeUtil.positionsMatch(nextPosition, foodPosition)) {
        dispatch(actionCreators.increaseScore());
        dispatch(actionCreators.increaseSpeed());
        dispatch(actionCreators.grow());
        dispatch(actionCreators.spawnFood());
        dispatch(actionCreators.decreaseCameraOffsetZ());
    } else {
        dispatch(actionCreators.move());
    }

    if (state.get("bufferedDirection")) {
        dispatch(actionCreators.changeDirection(state.get("bufferedDirection")));
        dispatch(actionCreators.bufferDirection(null));
    }
}


listenToKeys(store);
tick(store);


let rootEl = document.querySelector("#root");
React.render(
	<Provider store={store}>
		{ () => <App /> }
	</Provider>,
	rootEl
);
