import * as snakeUtil from "./utils/snakeUtil";
import * as actionCreators from "./actions/actionCreators";

export default function clientTick(store) {
    const dispatch = store.dispatch;
    let state = store.getState();

    // Create next tick
    setTimeout(() => clientTick(store), state.get("speed"));

    if (!state.get("isGameStarted") || state.get("isGamePaused")) {
        return;
    }

    // might be useful to have more generic actions, such as - prepareForNextTick
    dispatch(actionCreators.resetDirectionBufferFlag());
    dispatch(actionCreators.processSnakeBodyTick());

    state.get("socket").emit("snakeBody", {
        playerId: state.get("playerId"),
        snakeBody: state.get("snakeBody")
    });

    if (state.get("bufferedDirection")) {
        dispatch(actionCreators.changeDirection(state.get("bufferedDirection")));
        dispatch(actionCreators.bufferDirection(null));
    }
}
