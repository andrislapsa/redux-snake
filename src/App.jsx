import React, { Component } from "react";
import _ from "lodash";
import { Scene } from "react-three";
import { connect } from "react-redux";
import { Range } from "immutable";
import * as snakeUtil from "./utils/snakeUtil";
import { initGame, startGame, pauseGame, move, grow, spawnFood } from "./actions/actionCreators";
import Camera from "./components/Camera";
import Cube from "./components/Cube";
import Food from "./components/Food";
import CameraAdjuster from "./components/CameraAdjuster";

export default class App extends Component {
    constructor() {
        super();
        this._onGameNewStartClick = this._onGameNewStartClick.bind(this);
        this._onGameStartClick = this._onGameStartClick.bind(this);
        this._onGamePauseClick = this._onGamePauseClick.bind(this);
    }

    _onGameNewStartClick() {
        this.props.dispatch(initGame());
        this.props.dispatch(startGame());
    }

    _onGameStartClick() {
        this.props.dispatch(startGame());
    }

    _onGamePauseClick() {
        this.props.dispatch(pauseGame());
    }

    render() {
        const {
            snakeBody,
            direction,
            foodPosition,
            isGameStarted,
            isGamePaused,
            score,
            gridSize,
            cameraOffset
        } = this.props;

        let grid = snakeUtil.generateGrid();

        let createSection = segment => {
            return <Cube x={segment.get("x")} y={segment.get("y")} />;
        };

        snakeBody.map(segment => {
            let y = gridSize.get("height") - segment.get("y");
            grid[y][segment.get("x")] = "#";
        });

        let foodY = gridSize.get("height") - foodPosition.get("y");
        grid[foodY][foodPosition.get("x")] = "o";

        let webGLSize = {
            width: gridSize.get("width") * 10,
            height: gridSize.get("height") * 10
        };

        return (
            <div>
                <Scene camera="maincamera" {...webGLSize}>
                    <Camera {...webGLSize} cameraOffset={cameraOffset} />
                    {snakeBody.map(createSection)}
                    <Food x={foodPosition.get("x")} y={foodPosition.get("y")} />
                </Scene>

                <CameraAdjuster dispatch={this.props.dispatch} />

                <pre style={{lineHeight: "8px"}}>
                    {grid}
                </pre>
                <button
                    onClick={this._onGameNewStartClick}
                    disabled={isGameStarted?"disabled":""}
                >
                    Start new game
                </button>
                <button
                    onClick={this._onGameStartClick}
                    disabled={isGamePaused?"":"disabled"}
                >
                    Start game
                </button>
                <button
                    onClick={this._onGamePauseClick}
                    disabled={isGamePaused?"disabled":""}
                >
                    Pause game
                </button>
                Score: {score}
            </div>
        );
    }
}

function selectStateParts(state) {
    return {
        direction: state.get("direction"),
        snakeBody: state.get("snakeBody"),
        foodPosition: state.get("foodPosition"),
        score: state.get("score"),
        gridSize: state.get("gridSize"),
        isGamePaused: state.get("isGamePaused"),
        isGameStarted: state.get("isGameStarted"),
        cameraOffset: state.get("cameraOffset")
    };
}

export default connect(selectStateParts)(App);
