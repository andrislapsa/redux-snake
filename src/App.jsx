import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Range } from "immutable";
import * as snakeUtil from "./utils/snakeUtil";
import { initGame, startGame, pauseGame, move, grow, spawnFood } from "./actions/actionCreators";
import CameraAdjuster from "./components/CameraAdjuster";
import THREE from "three"
import Game from "./renderer/Game"

export default class App extends Component {
    constructor() {
        super();
        this._onGameNewStartClick = this._onGameNewStartClick.bind(this);
        this._onGameStartClick = this._onGameStartClick.bind(this);
        this._onGamePauseClick = this._onGamePauseClick.bind(this);
        this.game = new Game(40, 40);
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

    renderWebGL() {
        this.game.updateState(this);
        return (
            <div>
                <CameraAdjuster dispatch={this.props.dispatch} />
            </div>
        );
    }

    renderText() {
        let grid = snakeUtil.generateGrid();
        this.props.snakeBody.map(segment => {
            let y = this.props.gridSize.get("height") - segment.get("y");
            grid[y][segment.get("x")] = "#";
        });
        let foodY = this.props.gridSize.get("height")
            - this.props.foodPosition.get("y");
        grid[foodY][this.props.foodPosition.get("x")] = "o";

        return (
            <pre style={{lineHeight: "8px"}}>
                {grid}
            </pre>
        );
    }

    render() {
        return (
            <div>
                {this.renderWebGL()}
                <button
                    onClick={this._onGameNewStartClick}
                    disabled={this.props.isGameStarted?"disabled":""}
                    >
                    Start new game
                </button>
                <button
                    onClick={this._onGameStartClick}
                    disabled={this.props.isGamePaused?"":"disabled"}
                    >
                    Start game
                </button>
                <button
                    onClick={this._onGamePauseClick}
                    disabled={this.props.isGamePaused?"disabled":""}
                    >
                    Pause game
                </button>
                Score: {this.props.score}
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
        cameraOffsetZ: state.get("cameraOffsetZ")
    };
}

export default connect(selectStateParts)(App);
