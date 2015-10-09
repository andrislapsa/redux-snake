import React, { Component } from "react";

import { pauseGame, startGame } from "../actions/actionCreators";

export default function Controls(props) {
    return (
        <div id="controls">
            <button
                onClick={() => props.dispatch(startGame())}
                disabled={props.isGamePaused ? "" : "disabled"}
            >
                Start game
            </button>
            <button
                onClick={() => props.dispatch(pauseGame())}
                disabled={props.isGamePaused ? "disabled" : ""}
            >
                Pause game
            </button>
        </div>
    );
}
