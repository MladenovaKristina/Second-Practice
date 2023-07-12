import * as THREE from "three";
import Helpers from "../../helpers/helpers";
import Box from "./box";
import DragController from "./drag-controller";

export default class Enviroment extends THREE.Object3D {
  constructor(camera, scene, raycasterPlane) {
    super();
    this._box = null;
    this._camera = camera;
    this._scene = scene;
    this._raycasterPlane = raycasterPlane;

    this._initView();
    this._initBox();
    this._initDragController();

  }

  _initView() {
    const view = new THREE.Object3D();
    this.add(view);
  }
  _initBox() {
    this._box = new Box();
    this.add(this._box);
  }

  _initDragController() {
    this._dragController = new DragController(this._camera, this._scene, this._raycasterPlane);
    this.add(this._dragController);
    this._dragController.viewObject(this._box);
  }

  onUp() {
    this._dragController.onUp();
  }
  onMove(x, y) {
    this._dragController.onMove(x, y);
  }
  onDown(x, y) {
    this._dragController.onDown(x, y);
  }

}