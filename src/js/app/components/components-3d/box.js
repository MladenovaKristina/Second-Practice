import * as THREE from "three";

export default class Box extends THREE.Object3D {
    constructor() {
        super();
        this._initView();
    }

    _initView() {
        console.log("box");

        const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const cube = new THREE.Mesh(geometry, material);
        this.add(cube);
    }
}