import React, { Component } from "react";
import * as snakeUtil from "../utils/snakeUtil";

export default class TextRendered extends Component {
    putSnakeBodyIntoGrid(snakeBody, grid) {
        snakeBody.map(segment => {
            let y = this.props.gridSize.get("height") - segment.get("y") - 1,
                x = segment.get("x");

            if (!grid[y] || !grid[x]) {
                return;
            }

            grid[y][x] = "#";
        });

        return grid;
    }

    render() {
        let grid = snakeUtil.generateGrid();

        grid = this.putSnakeBodyIntoGrid(this.props.snakeBody, grid);

        this.props.players.map((player) => {
            grid = this.putSnakeBodyIntoGrid(player.get("snakeBody"), grid);
        });

        let foodY = this.props.gridSize.get("height") - this.props.foodPosition.get("y") - 1;
        grid[foodY][this.props.foodPosition.get("x")] = "o";

        return (
            <pre>{grid}</pre>
        );
    }
}