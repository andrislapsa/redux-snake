import React, { Component } from "react";
import * as snakeUtil from "../utils/snakeUtil";

export default class TextRendered extends Component {
    render() {
        let grid = snakeUtil.generateGrid();
        this.props.snakeBody.map(segment => {
            let y = this.props.gridSize.get("height") - segment.get("y") - 1,
                x = segment.get("x");

            if (!grid[y] || !grid[x]) {
                return;
            }

            grid[y][x] = "#";
        });
        let foodY = this.props.gridSize.get("height") - this.props.foodPosition.get("y") - 1;
        grid[foodY][this.props.foodPosition.get("x")] = "o";

        return (
            <pre>{grid}</pre>
        );
    }
}