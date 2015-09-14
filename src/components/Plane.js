import { Mesh } from "react-three"
import React, {Component} from "react"
import THREE from "three"

export default class Plane extends Component {
    render() {

        var planeProps = {
            // extend plane by one block on each side
            geometry: new THREE.PlaneGeometry(this.props.width + 2, this.props.height + 2, 100),
            material: new THREE.MeshBasicMaterial({color: 0xdff2ff, side: THREE.DoubleSide})
        }

        return (
            <Mesh {...planeProps} position={new THREE.Vector3(this.props.width/2, this.props.height/2, 0)} />
        );
    }
};