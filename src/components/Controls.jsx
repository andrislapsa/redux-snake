import React, { Component } from "react";

export default class Controls extends Component {
    constructor() {
        super();
        this._onGameStartClick = this._onGameStartClick.bind(this);
        this._onGamePauseClick = this._onGamePauseClick.bind(this);
    }

    _onGameStartClick() {
        this.props.dispatch(startGame());
    }

    _onGamePauseClick() {
        this.props.dispatch(pauseGame());
    }

    render() {
        return (
            <div id="controls">
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
            </div>
        );
    }
}
