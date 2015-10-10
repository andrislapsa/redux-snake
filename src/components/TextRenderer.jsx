import React, { Component } from "react";
import { Map, fromJS } from "immutable";

import * as snakeUtil from "../utils/snakeUtil";

function putSnakeBodyIntoGrid(snakeBody, grid, gridSize) {
    snakeBody.map(segment => {
        let y = gridSize.get("height") - segment.get("y") - 1,
            x = segment.get("x");

        if (!grid[y] || !grid[x]) {
            return;
        }

        grid[y][x] = "#";
    });

    return grid;
}

function renderGrid(players, foodPosition, gridSize) {
    let grid = snakeUtil.generateGrid();

    players.map((player) => {
        if (!player.get("snakeBody")) {
            return;
        }

        grid = putSnakeBodyIntoGrid(player.get("snakeBody"), grid, gridSize);
    });

    let foodY = gridSize.get("height") - foodPosition.get("y") - 1;
    grid[foodY][foodPosition.get("x")] = "o";

    return grid;
}

export default function TextRenderer(props) {
    window["ImmutableMap"] = Map;

    let classes = ["text-renderer", props.size].join(" "),
        players = props.players.set("currentPlayer", fromJS({ snakeBody: props.snakeBody }));

    return (
        <pre className={classes}>
            {renderGrid(
                players,
                props.foodPosition,
                props.gridSize
            )}
        </pre>
    );
}
