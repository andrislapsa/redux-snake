import THREE from "three";
import Cube from "./Cube";

var Game = class {
    constructor() {
        this.previousState = null;
        this.currentState = null;
        this.snakeBody = []; // contains instances of Cube
        this.clock = new THREE.Clock();
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, 500 / 500, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.speed = 10; // TODO(vv) get this from initial state
        this.renderer.setSize(500, 500); // TODO(vv) get this from initial state or something

        this.camera.position.x = 20;
        this.camera.position.y = 20;
        this.camera.position.z = 30;
        document.querySelector("#three-box").appendChild(this.renderer.domElement);

        // background
        var geometry = new THREE.PlaneGeometry(42, 42, 0);
        var material = new THREE.MeshBasicMaterial({color: 0x994444, side: THREE.DoubleSide});
        var plane = new THREE.Mesh(geometry, material);
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

    updateSpeed(updateInterval) {
        this.speed = 1 / updateInterval * 1000; // should be '1 / initialState.speed * 1000' for "smooth" movement; can be changed to any value
        this.snakeBody.forEach((cube) => {
            cube.speed = this.speed;
        });
    }

    updateState(state) {
        var self = this;

        this.previousState = this.currentState;
        this.currentState = state;

        //TODO(vv) calculate diff for necessary fields and update appropriate properties of game object

        // initialize snake body; TODO(vv) move this somewhere else
        if (!this.snakeBody.length && this.currentState && this.currentState.snakeBody) {
            this.currentState.snakeBody.forEach((segment, i) => {
                self.snakeBody.push(new Cube(self, segment.get("x"), segment.get("y")));
            });
        }

        if (this.previousState && this.previousState.speed !== this.currentState.speed) {
            this.updateSpeed(this.currentState.speed);
        }

        this.currentState.snakeBody.map((segment, i) => {
            if (!self.snakeBody[i]) {
                self.snakeBody[i] = new Cube(self, segment.get("x"), segment.get("y"));
            }
            self.snakeBody[i].moveTo(segment.get("x"), segment.get("y"));
        });
    }
};

export default Game;
