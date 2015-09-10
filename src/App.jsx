import React, { Component } from 'react';
import { connect } from "react-redux";



export default class App extends Component {
    render() {
        const { snakeBody, direction } = this.props;

        return (
            <div>
                heijā
            </div>
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