import { changeDirection } from "./actions/actionCreators";


function isValidKeystroke(currentDirection, newDirection) {
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
        let direction;
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

        if (isValidKeystroke(store.getState().get("direction"), direction)) {
            store.dispatch(changeDirection(direction));
        }
    };
}


