import React, { Component } from "react";

import Game from "../renderer/Game";

export default class WebGLRenderer extends Component {
    _updateWebglState() {
        this.game.updateState(this.props);
    }

    render() {
        this.game = this.game || new Game();
        this._updateWebglState();
        return (<div></div>);
    }
}
