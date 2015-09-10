import ReactTHREE, {} from "react-three"
import React, {Component} from "react"
import THREE from "three"

export default class Camera extends Component {
    render() {
        let cameraProps = {
            name: "maincamera",
            aspect: this.props.width / this.props.height,
            near: 1,
            far: 5000,
            position: new THREE.Vector3(0, 0, 20),
            lookat: new THREE.Vector3(0, 0, 0)
        };

        return (
            <ReactTHREE.PerspectiveCamera {...cameraProps} />
        );
    }
};