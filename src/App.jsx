import React, { Component } from "react";
import _ from "lodash";
import { Scene } from "react-three";
import { connect } from "react-redux";
import { Range } from "immutable";
import { generateGrid } from "./utils/snakeUtil";
import { initGame, startGame, pauseGame, move } from "./actions/actionCreators";
import Camera from "./components/Camera";
import Cube from "./components/Cube";

export default class App extends Component {
    constructor() {
        super();
        this._onGameNewStartClick = this._onGameNewStartClick.bind(this);
        this._onGameStartClick = this._onGameStartClick.bind(this);
        this._onGamePauseClick = this._onGamePauseClick.bind(this);
    }

    _onGameNewStartClick() {
        this.props.dispatch(initGame());
        this.props.dispatch(startGame(_.partial(tick, this.props.dispatch)));
    }

    _onGameStartClick() {
        this.props.dispatch(startGame(_.partial(tick, this.props.dispatch)));
    }

    _onGamePauseClick() {
        this.props.dispatch(pauseGame());
    }

    render() {
        const {
            snakeBody,
            direction,
            foodPosition,
            mainLoopTimerID,
            score,
            gridSize
        } = this.props;

        let grid = generateGrid();

        let createSection = segment => {
            return <Cube x={segment.get("x")} y={segment.get("y")} />;
        };

        snakeBody.map(segment => {
            let y = gridSize.get("height") - segment.get("y");
            grid[y][segment.get("x")] = "#";
        });

        grid[foodPosition.get("x")][foodPosition.get("y")] = "o";

        let webGLSize = {
            width: gridSize.get("width") * 10,
            height: gridSize.get("height") * 10
        };

        return (
            <div>
                <Scene camera="maincamera" {...webGLSize}>
                    <Camera {...webGLSize} />
                    {snakeBody.map(createSection)}
                </Scene>

                <pre style={{lineHeight: "8px"}}>
                    {grid}
                </pre>
                <button
                    onClick={this._onGameNewStartClick}
                    disabled={mainLoopTimerID?"disabled":""}
                >
                    Start new game
                </button>
                <button
                    onClick={this._onGameStartClick}
                    disabled={mainLoopTimerID?"disabled":""}
                >
                    Start game
                </button>
                <button
                    onClick={this._onGamePauseClick}
                    disabled={mainLoopTimerID?"":"disabled"}
                >
                    Pause game
                </button>
                Score: {score}
            </div>
        );
    }
}

function tick(dispatch) {
    dispatch(move());
}

function selectStateParts(state) {
    return {
        direction: state.get("direction"),
        snakeBody: state.get("snakeBody"),
        foodPosition: state.get("foodPosition"),
        mainLoopTimerID: state.get("mainLoopTimerID"),
        score: state.get("score"),
        gridSize: state.get("gridSize")
    };
}

export default connect(selectStateParts)(App);
