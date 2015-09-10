import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Range } from "immutable";
import { generateGrid } from "./utils/snakeUtil";
import { initGame, startGame, pauseGame, move } from "./actions/actionCreators";
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
        const { snakeBody, direction, mainLoopTimerID } = this.props;

        let grid = generateGrid();
        snakeBody.map(segment => {
            grid[segment.get("x")][segment.get("y")] = "#";
        });

        return (
            //<Cube width={window.innerWidth} height={window.innerHeight} cameraAngle={0}></Cube>
            <div>
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
        mainLoopTimerID: state.get("mainLoopTimerID")
    };
}

export default connect(selectStateParts)(App);
