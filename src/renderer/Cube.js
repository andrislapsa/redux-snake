
import THREE from "three";

var Cube = class {
    constructor(game) {
        this.object = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial({color: 0xff0000})
        );
        this.game = game;
        this.speed = 1 / 0.1; // should be '1 / initialState.speed * 1000' for "smooth" movement; can be changed to any value
        this.lerpPosStart = null;
        this.lerpPosEnd = null;
        this.lerpTimeStart = null;
        this.lerpTimeEnd = null;
        this.game.scene.add(this.object);
    }

    moveTo(x, y) {
        this.lerpPosStart = this.object.position.clone();
        this.lerpPosEnd = new THREE.Vector3(x, y, 1);

        var distance = Math.sqrt(Math.pow(this.lerpPosEnd.x - this.lerpPosStart.x, 2) + Math.pow(this.lerpPosEnd.y - this.lerpPosStart.y, 2));

        this.lerpTimeStart = this.game.clock.getElapsedTime();
        this.lerpTimeEnd = this.lerpTimeStart + Math.abs(distance / this.speed);

        //console.log("diff", this.lerpTimeStart, this.lerpTimeEnd, this.lerpTimeEnd - this.lerpTimeStart);
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

export default Cube;
