export default function tick (store) {
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
