import ReactTHREE, {} from "react-three"
import React, {Component} from "react"
import THREE from "three"

export default class Food extends Component {
    render() {
        let foodProps = {
            geometry: new THREE.BoxGeometry( 0.7, 0.7, 0.7 ),
            material: new THREE.MeshBasicMaterial( { color: 0x11ff33 } ),
            scale: new THREE.Vector3(1, 1, 1)
        };

        return (
            <ReactTHREE.Mesh {...foodProps} position={new THREE.Vector3(this.props.x, this.props.y, 0)}/>
        );
    }
};