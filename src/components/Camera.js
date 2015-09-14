import { PerspectiveCamera } from "react-three"
import React, {Component} from "react"
import THREE from "three"

export default class Camera extends Component {
    render() {
        let lookatVector = new THREE.Vector3(
                this.props.width / 2 + this.props.cameraLookAtOffsetX / 10,
                this.props.height / 2 + this.props.cameraLookAtOffsetY / 10,
                0
            ),
            positionVector = new THREE.Vector3(
                this.props.width / 2,
                this.props.height / 2,
                this.props.cameraOffsetZ * 2
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