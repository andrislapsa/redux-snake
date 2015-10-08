export default function (state, action) {
    state = state.set(
        "players",
        addPlayer(state.get("players"), action)
    );

    console.log("REDUCER", state.get("players").toJSON(), action);

    return state;
};

import * as consts from "./actions/actionTypes";
import initialPlayerState from "../src/initialState";

function addPlayer(state, action) {
    if (action.type === consts.PLAYER_JOINED) {
        console.log("hmm");
        return state.set(action.playerId, initialPlayerState);
    }

    return state;
}