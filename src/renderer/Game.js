import THREE from "three";
import Segment from "./Segment";
import Food from "./Food"

var Game = class {
    constructor() {
        this.previousState = null;
        this.currentState = null;
        this.snakeBody = []; // contains instances of Segment
        this.clock = new THREE.Clock();
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, 500 / 500, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.food = null;
        this.speed = 10; // TODO(vv) get this from initial state
        this.renderer.setSize(600, 600); // TODO(vv) get this from initial state or something

        this.camera.position.x = 20;
        this.camera.position.y = 20;
        this.camera.position.z = 30;
        document.querySelector("#three-box").appendChild(this.renderer.domElement);

        // background
        var plane = new THREE.Mesh(
            new THREE.PlaneGeometry(42, 42, 0),
            new THREE.MeshBasicMaterial({color: 0x343434, side: THREE.DoubleSide})
        );
        plane.position.set(20, 20, 0);
        this.scene.add(plane);

        this.pointLight = new THREE.PointLight(0xffffff, 1);
        this.pointLight.position.z = 30;
        this.scene.add(this.pointLight);

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

        if (this.food) {
            this.food.update();
        }

        //this.pointLight.position.x = Math.sin(this.clock.getElapsedTime()) * 4 + 20;
        //this.pointLight.position.y = Math.cos(this.clock.getElapsedTime()) * 4 + 20;
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    updateSpeed(updateInterval) {
        this.speed = 1 / updateInterval * 1000; // should be '1 / initialState.speed * 1000' for "smooth" movement; can be changed to any value
        console.log("updateInterval", updateInterval, "this.speed", this.speed);
        this.snakeBody.forEach((cube) => {
            cube.speed = this.speed;
        });
    }

    updateState(state) {
        this.previousState = this.currentState;
        this.currentState = state;

        var self = this;
        var foodPos = this.currentState.foodPosition;

        // initialize snake body; TODO(vv) move this somewhere else
        if (!this.snakeBody.length && this.currentState && this.currentState.snakeBody) {
            this.currentState.snakeBody.forEach((segment, i) => {
                self.snakeBody.push(new Segment(self, segment.get("x"), segment.get("y")));
            });
        }

        if (!this.food) {
            this.food = new Food(self, foodPos.get("x"), foodPos.get("y"));
        } else {
            this.food.setPosition(foodPos.get("x"), foodPos.get("y"));
        }

        if (this.previousState && this.previousState.speed !== this.currentState.speed) {
            this.updateSpeed(this.currentState.speed);
        }

        this.currentState.snakeBody.map((segment, i) => {
            if (!self.snakeBody[i]) {
                self.snakeBody[i] = new Segment(self, segment.get("x"), segment.get("y"));
            }
            self.snakeBody[i].moveTo(segment.get("x"), segment.get("y"));
        });
    }
};

export default Game;
