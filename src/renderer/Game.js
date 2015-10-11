import THREE from "three";
import { fromJS } from "immutable";

import Segment from "./Segment";
import Food from "./Food";
import Player from "./Player";

var Game = class {
    constructor() {
        this.previousState = null;
        this.currentState = null;
        this.clock = new THREE.Clock();
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, 500 / 500, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.players = {};
        this.food = null;
        this.gridWidth = 40;
        this.gridHeight = 40;
        this.speed = 10; // TODO(vv) get this from initial state
        this.initialize();
    }

    initialize() {
        this.renderer.setSize(600, 600); // TODO(vv) get this from initial state or something
        this.camera.position.x = this.gridWidth / 2;
        this.camera.position.y = this.gridHeight / 2;
        this.camera.position.z = 30;
        document.querySelector("#three-box").appendChild(this.renderer.domElement);

        // background
        var plane = new THREE.Mesh(
            new THREE.PlaneGeometry(this.gridWidth + 2, this.gridHeight + 2, 0),
            new THREE.MeshBasicMaterial({color: 0x343434, side: THREE.DoubleSide})
        );
        plane.position.set(this.gridWidth / 2, this.gridHeight / 2, 0);
        this.scene.add(plane);

        this.pointLight = new THREE.PointLight(0xffffff, 1);
        this.pointLight.position.z = 30;
        this.scene.add(this.pointLight);

        this.createWalls();
        this.loop();
    }

    loop() {
        requestAnimationFrame(this.loop.bind(this));
        this.update();
        this.render();
    }

    update() {
        if (this.food) {
            this.food.update();
        }

        for (var playerId in this.players) {
            this.players[playerId].update();
        };

        this.pointLight.position.x = Math.sin(this.clock.getElapsedTime()) * 4 + 20;
        this.pointLight.position.y = Math.cos(this.clock.getElapsedTime()) * 4 + 20;
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    updateSpeed(updateInterval) {
        this.speed = 1 / updateInterval * 1000; // should be '1 / initialState.speed * 1000' for "smooth" movement; can be changed to any value
        for (var playerId in this.players) {
            this.players[playerId].snakeBody.forEach( (segment) => {
                segment.speed = this.speed;
            });
        };
    }

    updateState(state) {
        this.previousState = this.currentState;
        this.currentState = state;

        var self = this;
        var foodPos = this.currentState.foodPosition;
        let currentPlayer = fromJS({ snakeBody: this.currentState.snakeBody });
        let players = this.currentState.players.set(
            this.currentState.playerId, currentPlayer
        );

        players.forEach( (playerData, playerId) => {
            if (!(playerId in self.players)) {
                var player = new Player(self, playerId);

                playerData.get("snakeBody").forEach((segment, i) => {
                    player.snakeBody.push(new Segment(self, segment.get("x"), segment.get("y"), player.color));
                });
                this.players[playerId] = player;
            } else {
                var player = self.players[playerId];

                playerData.get("snakeBody").forEach((segment, i) => {
                    if (!player.snakeBody[i]) {
                        player.snakeBody[i] = new Segment(self, segment.get("x"), segment.get("y"), player.color);
                    }
                    player.snakeBody[i].moveTo(segment.get("x"), segment.get("y"));
                });
            }
        });

        if (!this.food) {
            this.food = new Food(self, foodPos.get("x"), foodPos.get("y"));
        } else {
            this.food.setPosition(foodPos.get("x"), foodPos.get("y"));
        }

        if (this.previousState && this.previousState.speed !== this.currentState.speed) {
            this.updateSpeed(this.currentState.speed);
        }
    }

    createWalls() {
        var color = 0x5577ee;

        this.topWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.gridWidth + 4, 1, 2),
            new THREE.MeshLambertMaterial({color: color})
        );
        this.topWall.position.set(this.gridWidth / 2, this.gridHeight + 1, 1);
        this.scene.add(this.topWall);

        this.rightWall = new THREE.Mesh(
            new THREE.BoxGeometry(1, this.gridHeight + 4, 2),
            new THREE.MeshLambertMaterial({color: color})
        );
        this.rightWall.position.set(this.gridWidth + 1, this.gridHeight / 2, 1);
        this.scene.add(this.rightWall);

        this.bottomWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.gridWidth + 4, 1, 2),
            new THREE.MeshLambertMaterial({color: color})
        );
        this.bottomWall.position.set(this.gridWidth / 2, -1, 1);
        this.scene.add(this.bottomWall);

        this.leftWall = new THREE.Mesh(
            new THREE.BoxGeometry(1, this.gridHeight + 4, 2),
            new THREE.MeshLambertMaterial({color: color})
        );
        this.leftWall.position.set(-1, this.gridHeight / 2, 1);
        this.scene.add(this.leftWall);
    }

};

export default Game;
