import { create } from "zustand";
import { ThreeStore } from "../../types";
import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { EffectComposer } from "three-stdlib";
import { CameraControls } from "@react-three/drei";

const useThreeStore = create<ThreeStore>((set) => ({
	// Objects.
	renderer: null,
	composer: null,
	scene: null,
	camera: null,
	cameraControls: null,

	// Objects.
	setRenderer: (renderer: WebGLRenderer) => {
		set(() => {
			return { renderer: renderer };
		});
	},
	setComposer: (composer: EffectComposer) => {
		set(() => {
			return { composer: composer };
		});
	},
	setScene: (scene: Scene) => {
		set(() => {
			return { scene: scene };
		});
	},
	setCamera: (camera: PerspectiveCamera) => {
		set(() => {
			return { camera: camera };
		});
	},
	setCameraControls: (cameraControls: CameraControls) => {
		set(() => {
			return { cameraControls: cameraControls };
		});
	},
}));

export default useThreeStore;
