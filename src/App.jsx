import React, { Component } from "react";
import { connect } from "react-redux";
import { Range } from "immutable";
import { generateGrid } from "./utils/snakeUtil";
import { startGame } from "./actions/actionCreators";
import Cube from "./components/Cube";

export default class App extends Component {
    render() {
        const { snakeBody, direction } = this.props;

        let grid = generateGrid();
        snakeBody.map(segment => {
            grid[segment.get("x")][segment.get("y")] = "#";
        });

        console.log(Cube);

        return (
            <Cube width={window.innerWidth} height={window.innerHeight} cameraAngle={0}></Cube>
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