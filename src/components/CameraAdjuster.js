import React, { Component } from "react";
import * as actionCreators from "../actions/actionCreators";

export default class CameraAdjuster extends Component {
    cameraChanged(e, axis) {
        let action = actionCreators.adjustCamera(axis, parseInt(e.target.value, 10));
        this.props.dispatch(action);
        //console.log("yep, changed", axis, e.target.value);
    }

    render() {
        let generateSliders = axis => {
            return (
                <div>
                    <strong>{axis}:</strong>
                    <input
                        min="-100"
                        max="100"
                        type="range"
                        onChange={e => { this.cameraChanged(e, axis) }}
                    />
                </div>
            )
        };

        return (
            <div>{["x", "y", "z"].map(generateSliders)}</div>
        );
    }
}