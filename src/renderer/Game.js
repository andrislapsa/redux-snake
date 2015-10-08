import THREE from "three";
import Cube from "./Cube";

var logged = false;

var Game = class {
    constructor() {
        this.previousState = null;
        this.currentState = null;
        this.snakeBody = []; // contains instances of Cube
        this.clock = new THREE.Clock();
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, 500/500, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.cube = null;
        this.speed = 100; // TODO(vv) get this from initial state
        this.renderer.setSize(500, 500); // TODO(vv) get this from initial state or something

        this.camera.position.x = 20;
        this.camera.position.y = 20;
        this.camera.position.z = 30;
        document.querySelector("#three-box").appendChild(this.renderer.domElement);

        // background
        var geometry = new THREE.PlaneGeometry(42, 42, 0);
        var material = new THREE.MeshBasicMaterial( {color: 0x994444, side: THREE.DoubleSide} );
        var plane = new THREE.Mesh( geometry, material );
        plane.position.x = 20;
        plane.position.y = 20;
        plane.position.z = 0;
        this.scene.add(plane);

        this.loop();
    }

    loop() {
        requestAnimationFrame(this.loop.bind(this));
        this.update();
        this.render();
    }

    update() {
        if (this.snakeBody.length) {
            this.snakeBody.forEach((cube) => {
                cube.update();
            });
        }
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    updateSnakeSpeed(updateInterval) {
        this.snakeBody.forEach((cube) => {
            cube.speed = 1 / updateInterval * 1000;
        });
    }

    updateState(state) {
        if (!this.snakeBody.length) {
            this.snakeBody.push(new Cube(this));
        }

        //TODO(vv) calculate diff for necessary fields and update appropriate properties of game object

        this.previousState = this.currentState;
        this.currentState = state;

        if (this.previousState && this.previousState.speed !== this.currentState.speed) {
            this.updateSnakeSpeed(this.currentState.speed);
        }

        var snakeHead = this.currentState.snakeBody.last();

        this.snakeBody[0].moveTo(snakeHead.get("x"), snakeHead.get("y"));
    }
};

export default Game;
