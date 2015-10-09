import * as actions from "./actions/actionCreators";
import * as snakeUtil from "../src/utils/snakeUtil";
import * as log from "./log";

const speed = 300;
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

    let foodPosition = state.get("foodPosition");

    players.map((player, playerId) => {
        let headPosition = snakeUtil.getHead(player.get("snakeBody"));

        // Here we can make collision detection with food or other players
        log.debug(`[${playerId}] stalledTicks ${player.get("stalledTicks")} @ ${headPosition}`);
    });

    store.dispatch(actions.cleanupStalledPlayers());

    let food = { hehe: "food" };

    io.emit("serverTick", { players, food });
}
