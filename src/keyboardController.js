import { changeDirection, bufferDirection } from "./actions/actionCreators";


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

export function listenToKeys(store) {
    document.onkeydown = function(e) {
        let direction,
            state = store.getState();

        switch (e.keyCode) {
            case 37:
                direction = 'left';
                break;
            case 38:
                direction = 'up';
                break;
            case 39:
                direction = 'right';
                break;
            case 40:
                direction = 'down';
                break;
        }

        if (direction) {
            e.preventDefault();
        }

        if (isValidKeystroke(state.get("direction"), direction)) {
            if (state.get("directionChangedInTick")) {
                store.dispatch(bufferDirection(direction));
            } else {
                store.dispatch(changeDirection(direction));
            }
        }
    };
}


