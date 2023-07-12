import * as THREE from "three";

export default class DragController extends THREE.Object3D {
    constructor(camera, scene, raycasterPlane) {
        super();
        this._camera = camera;
        this._scene = scene;
        this._raycasterPlane = raycasterPlane;
        this._object = null;
        this._raycaster = new THREE.Raycaster();
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
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const clampedX = Math.max(Math.min(x, screenWidth), 0);
        const clampedY = Math.max(Math.min(y, screenHeight), 0);

        const normalizedX = (clampedX / screenWidth) * 2 - 1;
        const normalizedY = -(clampedY / screenHeight) * 2 + 1;

        this._raycaster.setFromCamera({ x: normalizedX, y: normalizedY }, this._camera);
        const intersects = this._raycaster.intersectObjects(this._scene.children, true).filter(object => object.object.geometry.type === 'BoxGeometry');

        if (intersects.length > 0) {
            this.color();
            // Get the intersection point in world coordinates
            const intersectionPoint = intersects[0].point;
            // Set the object's position
            this._object.position.copy(intersectionPoint).setZ(0);
        }
    }

    color() {
        this._object.children[0].material.color.set(0x00ff00);
    }

    reset() {
        this._object.children[0].material.color.set(0xff0000);
    }
}
