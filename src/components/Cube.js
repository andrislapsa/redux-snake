import ReactTHREE from "react-three"
import React, {Component} from "react"
import THREE from "three"

export default class Cube extends Component {
    render() {
        var sceneProps = {
            width: this.props.width,
            height: this.props.height,
            camera: "maincamera"
        };

        var mainCamera = React.createElement(
            ReactTHREE.PerspectiveCamera,
            {
                name: "maincamera",
                aspect: this.props.width / this.props.height,
                near: 1,
                far: 5000,
                position: new THREE.Vector3(0, 0, 10),
                lookat: new THREE.Vector3(0, 0, 0)
            }
        );

        var sphere = React.createElement(
            ReactTHREE.Mesh,
            {
                geometry: new THREE.BoxGeometry( 0.8, 0.8, 0.8 ),
                material: new THREE.MeshBasicMaterial( { color: 0xffddee } ),
                position: new THREE.Vector3(1, 0, -10),
                scale: new THREE.Vector3(1, 1, -1)
            }
        );

        return React.createElement(
            ReactTHREE.Scene,
            sceneProps,
            mainCamera,
            sphere
        );
    }
};