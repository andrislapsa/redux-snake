import * as actions from "./actions/actionCreators";
import * as snakeUtil from "../src/utils/snakeUtil";

const speed = 300;

export default function ticker(store, io) {
    let state = store.getState(),
        players = state.get("players");

    console.log("server tick (players online: %d)", players.count());

    setTimeout(() => ticker(store, io), state.get("speed"));

    if (players.count() === 0) {
        return;
    }

    let foodPosition = state.get("foodPosition");

    players.map((player, playerId) => {
        let previousHeadPosition = snakeUtil.getHead(player.get("previousSnakeBody")),
            headPosition = snakeUtil.getHead(player.get("snakeBody"));

        // Here we can make collision detection with food or other players
        console.log("player %s stalledTicks %d", playerId, player.get("stalledTicks"), previousHeadPosition, headPosition);
    });

    store.dispatch(actions.cleanupStalledPlayers());
}
