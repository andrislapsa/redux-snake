import { changeDirection, bufferDirection, pauseGame, startGame } from "./actions/actionCreators";


function isValidKeystroke(currentDirection, newDirection) {
    if (!newDirection) {
        return false;
    }

    // don't allow 180 degree direction change
    const invalidKeystrokes = {
        down: "up",
        up: "down",
        left: "right",
        right: "left"
    };

    return invalidKeystrokes[currentDirection] !== newDirection;
}

function getDirectionFromKeyEvent(e) {
    switch (e.keyCode) {
        case 37:
            return "left";
        case 38:
            return "up";
        case 39:
            return "right";
        case 40:
            return "down";
    }
}

export function listenToKeys(store) {
    document.onkeydown = function(e) {
        let direction = getDirectionFromKeyEvent(e),
            state = store.getState();

        if (direction) {
            e.preventDefault();
            if (isValidKeystroke(state.get("direction"), direction)) {
                if (state.get("directionChangedInTick")) {
                    store.dispatch(bufferDirection(direction));
                } else {
                    store.dispatch(changeDirection(direction));
                }
            }
        }

        if (e.keyCode === 32) {
            e.preventDefault();
            if (state.get("isGamePaused")) {
                store.dispatch(startGame());
            } else {
                store.dispatch(pauseGame());
            }
        }
    };
}
