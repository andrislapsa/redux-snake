import * as reducer from "./snake";


export default function (state, action) {
    state = reducer.initGame(state, action);

    state = reducer.spawnFood(state, action);

    state = reducer.updateFood(state, action);

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

    state = state.set(
        "players",
        reducer.updatePlayer(state.get("players"), action)
    );

    return state;
};
