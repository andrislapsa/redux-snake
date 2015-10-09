import { fromJS } from "immutable";

import * as consts from "./actions/actionTypes";
import initialPlayerState from "../src/initialState";
import * as snakeUtil from "../src/utils/snakeUtil";

export default function (state, action) {
    state = state.set(
        "players",
        addPlayer(state.get("players"), action)
    );

    state = state.set(
        "players",
        updatePlayerSnake(state.get("players"), action)
    );

    state = state.set(
        "players",
        cleanupStalledPlayers(state.get("players"), action)
    );

    return state;
};

function addPlayer(state, action) {
    if (action.type === consts.PLAYER_JOINED) {
        state = state.set(action.playerId, fromJS({
            stalledTicks: 0,
            snakeBody: initialPlayerState.snakeBody
        }));
    }

    return state;
}

function cleanupStalledPlayers(state, action) {
    if (action.type === consts.CLEANUP_STALLED_PLAYERS) {
        let mState = state.toJSON(),
            player,
            playerId,
            oldPosition,
            newPosition;

        for (playerId in mState) {
            player = mState[playerId];
            oldPosition = snakeUtil.getHead(fromJS(player.previousSnakeBody));
            newPosition = snakeUtil.getHead(fromJS(player.snakeBody));

            if (snakeUtil.positionsMatch(oldPosition, newPosition)) {
                player.stalledTicks++;
            }

            player.previousSnakeBody = player.snakeBody;
        }

        return fromJS(mState);
    }

    return state;
}

function updatePlayerSnake(state, action) {
    if (action.type === consts.UPDATE_PLAYER_SNAKE) {
        let previousPlayerState = state.get(action.playerId);

        // console.log("previousPlayerState !!!! %s !!!!", action.playerId, previousPlayerState);

        return state.withMutations((state) => {
            state.setIn(
                [ action.playerId, "snakeBody" ],
                fromJS(action.snakeBody)
            );

            state.setIn(
                [ action.playerId, "previousSnakeBody" ],
                previousPlayerState.get("snakeBody")
            );

            return state;
        })
    }

    return state;
}
