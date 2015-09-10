import ReactTHREE, {} from "react-three"
import React, {Component} from "react"
import THREE from "three"

export default class Scene extends Component {
    render() {
        let cubeProps = {
            geometry: new THREE.BoxGeometry( 0.8, 0.8, 0.8 ),
            material: new THREE.MeshBasicMaterial( { color: 0xff4433 } ),
            scale: new THREE.Vector3(1, 1, -1)
        };

        return (
            <ReactTHREE.Mesh {...cubeProps} position={new THREE.Vector3(this.props.x, this.props.y, 0)}/>
        );
    }
};