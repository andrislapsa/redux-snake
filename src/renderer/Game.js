import THREE from "three";
import Cube from "./Cube";

var Game = class {
    constructor(width, height) {
        this.previousState = null;
        this.currentState = null;
        this.snakeBody = []; // contains instances of Cube
        this.clock = new THREE.Clock();
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.cube = null;

        this.renderer.setSize(500, 500); // TODO(vv) get this from initial state or something
        document.body.appendChild(this.renderer.domElement);

        this.camera.position.z = 8; // TODO(vv) correct zoom

        // background
        var geometry = new THREE.PlaneGeometry( 12, 8, 4 );
        var material = new THREE.MeshBasicMaterial( {color: 0xff9933, side: THREE.DoubleSide} );
        var plane = new THREE.Mesh( geometry, material );
        plane.position.z = -10;
        this.scene.add(plane);

        this.loop();
    }

    loop() {
        requestAnimationFrame(this.loop.bind(this));
        this.update();
        this.render();
    }

    update() {
        if (this.cube) {
            this.cube.update();
        }
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    updateState(state) {
        if (!this.cube) {
            this.cube = new Cube(this);
        }

        //TODO(vv) calculate diff for necessary fields and update appropriate properties of game object

        this.previousState = this.currentState;
        this.currentState = state;

        var snakeHead = this.currentState.props.snakeBody.last();

        this.cube.moveTo(snakeHead.get("x"), snakeHead.get("y"));
    }
};

export default Game;
