import { fromJS } from "immutable";

import * as log from "./log";
import * as config from "../src/config/config";
import * as consts from "./actions/actionTypes";
import initialPlayerState from "../src/initialState";
import * as snakeUtil from "../src/utils/snakeUtil";

export default function (state, action) {
    state = spawnFood(state, action);

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

            if (player.stalledTicks > config.CLIENT_TICK_TIMEOUT) {
                log.info(`Player '${playerId}' removed from state due to stalling.`);
                delete mState[playerId];
            } else {
                player.previousSnakeBody = player.snakeBody;
            }
        }

        return fromJS(mState);
    }

    return state;
}

function updatePlayerSnake(state, action) {
    if (action.type === consts.UPDATE_PLAYER_SNAKE) {
        let previousPlayerState = state.get(action.playerId);

        if (!previousPlayerState) {
            log.info(`Player '${action.playerId}' got kicked out (no previous state on server)`);
            action.client.disconnect();
            return state;
        }

        // log.debug("previousPlayerState !!!! %s !!!!", action.playerId, previousPlayerState);

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

export function spawnFood(state, action) {
    if (action.type === consts.SPAWN_FOOD) {
        let occupiedBlocks = state.get("players").filter(player => player.get("snakeBody"));

        return state.set("foodPosition", snakeUtil.randomFoodPosition(
            occupiedBlocks,
            state.get("gridSize").get("width"),
            state.get("gridSize").get("height")
        ));
    }

    return state;
}

export function increaseScore(state, action) {
    if (action.type !== consts.INCREASE_SCORE) {
        return state;
    }

    return state + action.amount;
}

export function increaseSpeed(state, action) {
    if (action.type !== consts.INCREASE_SPEED) {
        return state;
    }

    let newState = state - action.amount;

    if (newState < 0) {
        return 0;
    }

    return newState;
}
