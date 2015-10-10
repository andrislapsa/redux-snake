import React, { Component } from "react";
import { Map, fromJS } from "immutable";
import _ from "lodash";

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

function playerInfo(currentPlayerId, player, playerId) {
    let playerHeadPosition = snakeUtil.getHead(player.get("snakeBody")),
        classes = ["player-info"];

    if (currentPlayerId === playerId) {
        classes.push("current-player");
    }

    return (
        <pre key={playerId} className={classes.join(" ")}>
            Player [{playerId}] head position:
            x={playerHeadPosition.get("x")} y={playerHeadPosition.get("y")}
        </pre>
    )
}

export default function TextRenderer(props) {
    window["ImmutableMap"] = Map;

    let classes = ["text-renderer", props.size].join(" "),
        players = props.players.set(props.currentPlayerId, fromJS({ snakeBody: props.snakeBody })),
        info = [];

    // not using map, as React doesn't seem to like it yet
    players.forEach((player, playerId) => {
        info.push(playerInfo(props.currentPlayerId, player, playerId));
    });

    return (
        <div>
            <pre className={classes}>
                {renderGrid(
                    players,
                    props.foodPosition,
                    props.gridSize
                )}
            </pre>
            {info}
        </div>
    );
}
