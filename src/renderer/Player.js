import THREE from "three";

var Player = class {
    constructor(game, uuid) {
        this.uuid = uuid;
        this.game = game;
        this.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        this.snakeBody = [];
    }

    update() {
        this.snakeBody.forEach((segment) => {
            segment.update();
        });
    }
}

export default Player;
