import { useGLTF, useTexture } from "@react-three/drei";
import { baseUrl } from "../../global";
import useMeasurements from "../stores/useMeasurements";
import { shallow } from "zustand/shallow";
import * as THREE from "three";

export default function Nose() {

	//stores
	const {frameLength} = useMeasurements(
		(state) => ({
			frameLength: state.frameLength,
		}),
		shallow
	);
	const coupler = useGLTF(`${baseUrl}/models/coupler2.0.glb`) as any;
	
	const couplerRubber = useGLTF(`${baseUrl}/models/coupler-rubber.glb`) as any;

	const stealTexture = useTexture(`${baseUrl}/textures/metal2.0/NormalSteal.jpg`);
	stealTexture.colorSpace = THREE.SRGBColorSpace;

	// const metalMatcap = useTexture(`${baseUrl}/matcaps/steal6.png`);

	const metal = new THREE.MeshStandardMaterial({
		// normalMap: stealTexture,
		color: "#808088",
		metalness: 0.8,
		roughness: 0.2
	});

	const rubber = new THREE.MeshStandardMaterial({
		color: "#333333",
		metalness: 0.7,
		roughness: 0.5
	});
	// const metal = new THREE.MeshMatcapMaterial({
	// 	// map: stealTexture,
	// 	matcap: metalMatcap,
	// 	color: "#eeeeef",
	// 	// metalness: 0.5,
	// 	// roughness: 0.3
	// });

	coupler.scene.traverse((child: any) => {
		if (child.isMesh) {
			child.material = metal;
			child.material.needsUpdate = true;
		}
	});
	couplerRubber.scene.traverse((child: any) => {
		if (child.isMesh) {
			child.material = rubber;
			child.material.needsUpdate = true;
		}
	});


	return (
		<group
		scale={[0.11, 0.15, 0.1]}
		position={[-frameLength / 2 - 0.985, -0.027, 0]}
		castShadow
		>
			<primitive object={couplerRubber.scene} castShadow/>
			<primitive object={coupler.scene} castShadow/>
		</group>
	);
}
