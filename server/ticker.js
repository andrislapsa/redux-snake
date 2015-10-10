import * as actions from "./actions/actionCreators";
import * as snakeUtil from "../src/utils/snakeUtil";
import * as log from "./log";

let emptyTickLogged = false;

export default function ticker(store, io) {
    let state = store.getState(),
        players = state.get("players");

    if (players.count() > 0 || !emptyTickLogged) {
        emptyTickLogged = true;
        log.debug(`server tick (players online: ${players.count()})`);
    }

    setTimeout(() => ticker(store, io), state.get("speed"));

    if (players.count() === 0) {
        return;
    }

    emptyTickLogged = false;

    players.map((player, playerId) => {
        let headPosition = snakeUtil.getHead(player.get("snakeBody"));

        if (snakeUtil.positionsMatch(headPosition, state.get("foodPosition"))) {
            log.debug(`Spawning new food`);
            store.dispatch(actions.spawnFood());
        }

        // Here we can make collision detection with food or other players
        log.debug(`[${playerId}] stalledTicks ${player.get("stalledTicks")} @ ${headPosition}`);
    });

    store.dispatch(actions.cleanupStalledPlayers());

    io.emit("serverTick", {
        players,
        foodPosition: state.get("foodPosition"),
        speed: state.get("speed")
    });
}
