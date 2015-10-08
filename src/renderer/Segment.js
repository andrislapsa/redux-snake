import THREE from "three";

var Segment = class {
    constructor(game, x, y) {
        this.object = new THREE.Mesh(
            new THREE.BoxGeometry(0.8, 0.8, 0.8),
            new THREE.MeshLambertMaterial({color: 0xff5555, shading: THREE.SmoothShading})
        );
        this.object.position.x = x;
        this.object.position.y = y;
        this.game = game;
        this.speed = this.game.speed;
        this.lerpPosStart = null;
        this.lerpPosEnd = null;
        this.lerpTimeStart = null;
        this.lerpTimeEnd = null;
        this.game.scene.add(this.object);
        this.moveTo(x, y);
    }

    moveTo(x, y) {
        if (this.lerpPosEnd && this.lerpPosEnd.x === x && this.lerpPosEnd.y === y) {
            return;
        }

        this.lerpPosStart = this.object.position.clone();
        this.lerpPosEnd = new THREE.Vector3(x, y, 1);

        var distance = Math.sqrt(Math.pow(this.lerpPosEnd.x - this.lerpPosStart.x, 2) + Math.pow(this.lerpPosEnd.y - this.lerpPosStart.y, 2));

        this.lerpTimeStart = this.game.clock.getElapsedTime();
        this.lerpTimeEnd = this.lerpTimeStart + Math.abs(distance / this.speed);
    }

    update() {
        // how far from lerpPosStart (0) to lerpPosEnd (1) should we be?
        var alpha = (this.game.clock.getElapsedTime() - this.lerpTimeStart) / (this.lerpTimeEnd - this.lerpTimeStart);

        if (alpha > 1) {
            alpha = 1;
        }

        this.object.position.lerpVectors(this.lerpPosStart, this.lerpPosEnd, alpha);
    }
}

export default Segment;
