import { changeDirection } from "./actions/actionCreators";


export function listenToKeys(dispatch) {
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

        dispatch(changeDirection(direction));
    };
}


