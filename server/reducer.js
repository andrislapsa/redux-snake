import { fromJS } from "immutable";

export default function (state, action) {
    state = state.set(
        "players",
        addPlayer(state.get("players"), action)
    );

    state = state.set(
        "players",
        updateSnakeBody(state.get("players"), action)
    );

    return state;
};

import * as consts from "./actions/actionTypes";
import initialPlayerState from "../src/initialState";

function addPlayer(state, action) {
    if (action.type === consts.PLAYER_JOINED && action.playerId) {
        state = state.set(action.playerId, fromJS({
            snakeBody: initialPlayerState.snakeBody
        }));
    }

    return state;
}

function updateSnakeBody(state, action) {
    if (action.type === consts.UPDATE_SNAKE_BODY) {
        return state.setIn([ action.playerId, "snakeBody" ], fromJS(action.snakeBody));
    }

    return state;
}