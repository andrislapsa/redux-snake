import { PerspectiveCamera } from "react-three"
import React, {Component} from "react"
import THREE from "three"

export default class Camera extends Component {
    render() {
        let positionVector,
            lookatVector = new THREE.Vector3(20, 20, 0),
            adjustedOffset = this.props.cameraOffset;

        positionVector = new THREE.Vector3(
            20 + adjustedOffset.get("x"),
            20 + adjustedOffset.get("y"),
            50 + adjustedOffset.get("z")
        );

        let cameraProps = {
            name: "maincamera",
            aspect: this.props.width / this.props.height,
            near: 1,
            far: 5000,
            position: positionVector,
            lookat: lookatVector
        };

        return (
            <PerspectiveCamera {...cameraProps} />
        );
    }
};