import React, { Component } from "react";
import { connect } from "react-redux";
import { Range } from "immutable";
import { generateGrid } from "./utils/snakeUtil";

export default class App extends Component {
    render() {
        const { snakeBody, direction } = this.props;

        let grid = generateGrid();
        snakeBody.map(segment => {
            grid[segment.get("x")][segment.get("y")] = "#";
        });

        return (
            <pre style={{lineHeight: "8px"}}>
                {grid}
            </pre>
        );
    }
}


function selectStateParts(state) {
    return {
        direction: state.get("direction"),
        snakeBody: state.get("snakeBody")
    };
}

export default connect(selectStateParts)(App);