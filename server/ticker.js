const speed = 100;

export default function ticker(store, io) {
    console.log("server tick");
    setTimeout(() => ticker(store, io), speed);

    let players = store.getState().get("players");

    if (players.count() === 0) {
        console.log("no players connected");
        return;
    }

    players.map((player, playerId) => {
        let snakeHead = player.get("snakeBody").last();

        // Here we can make collision detection with food or other players
        console.log("snakeHead for player %s", playerId, snakeHead);
    });
}