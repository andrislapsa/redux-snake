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

const store = createStore(megaReducer, fromJS(initialState));
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
