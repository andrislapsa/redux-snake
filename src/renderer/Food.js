import THREE from "three";

var Food = class {
    constructor(game, x, y) {
        this.object = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshLambertMaterial({color: 0xff9900})
        );
        this.object.position.x = x;
        this.object.position.y = y;
        this.game = game;
        this.game.scene.add(this.object);
    }

    update() {
        this.object.rotation.x += 0.03;
        this.object.rotation.y += 0.03;
    }

    setPosition(x, y) {
        this.object.position.set(x, y, 1);
    }
}

export default Food;
