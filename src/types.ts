import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { CameraControls } from "@react-three/drei";
import { EffectComposer } from "three-stdlib";


export type ThreeStore = {
	renderer: WebGLRenderer | null;
	composer: EffectComposer | null;
	scene: Scene | null;
	camera: PerspectiveCamera | null;
	cameraControls: CameraControls | null;

	setRenderer: (renderer: WebGLRenderer) => void;
	setComposer: (composer: EffectComposer) => void;
	setScene: (scene: Scene) => void;
	setCamera: (camera: PerspectiveCamera) => void;
	setCameraControls: (cameraControls: CameraControls) => void;
};