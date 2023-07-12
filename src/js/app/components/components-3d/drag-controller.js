import * as THREE from "three";
import Helpers from "../../helpers/helpers";

export default class DragController extends THREE.Object3D {
    constructor(camera, scene, raycasterPlane) {
        super();
        this._camera = camera;
        this._scene = scene;
        this._raycasterPlane = raycasterPlane;
        this._object = null;
        this._initView();
    }

    _initView() {
        this._raycaster = new THREE.Raycaster();
        this._pointer = new THREE.Vector2();
    }

    viewObject(object) {
        this._object = object;
    }

    onDown(x, y) {
        this.move(x, y);

    }

    onMove(x, y) {
        this.move(x, y);
    }

    onUp() {
        this.reset();
    }

    move(x, y) {

        this._pointer.x = (x / window.innerWidth) * 2 - 1;
        this._pointer.y = -(y / window.innerHeight) * 2 + 1;

        this._raycaster.setFromCamera(this._pointer, this._camera);
        const intersects = this._raycaster.intersectObjects(this._scene.children, true).filter(object => object.object.geometry.type === 'BoxGeometry');

        if (intersects != 0) {
            this.color();
            this._object.position.x = this._pointer.x;
            this._object.position.y = this._pointer.y;
        }

    }

    color() {
        this._object.children[0].material.color.set(0x00ff00)
    }

    reset() {
        this._object.children[0].material.color.set(0xff0000)
    }
}