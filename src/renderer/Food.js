import THREE from "three";

var Food = class {
    constructor(game, x, y) {
        this.object = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial({color: 0xff0000})
        );
        this.object.position.x = x;
        this.object.position.y = y;
        this.game = game;
        this.game.scene.add(this.object);
    }

    update() {
        this.object.rotation.x += 0.01;
        this.object.rotation.y += 0.01;
    }

    setPosition(x, y) {
        this.object.position.set(x, y, 1);
    }
}

export default Food;
