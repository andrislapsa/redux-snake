import React, { Component } from "react";
import { Scene } from "react-three";
import { connect } from "react-redux";
import { Range } from "immutable";
import { generateGrid } from "./utils/snakeUtil";
import { startGame } from "./actions/actionCreators";
import Camera from "./components/Camera";
import Cube from "./components/Cube";

export default class App extends Component {
    render() {
        const { snakeBody, direction } = this.props;

        let grid = generateGrid();

        let createSection = segment => {
            return <Cube x={segment.get("x")} y={segment.get("y")} />;
        };

        snakeBody.map(segment => {
            grid[segment.get("x")][segment.get("y")] = "#";
        });

        return (
            <Scene camera="maincamera" width={window.innerWidth} height={window.innerHeight}>
                <Camera width={window.innerWidth} height={window.innerHeight} />
                {snakeBody.map(createSection)}
            </Scene>

            //<pre style={{lineHeight: "8px"}}>
            //    {grid}
            //</pre>
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