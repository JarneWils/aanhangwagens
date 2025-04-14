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
	const coupler = useGLTF(`${baseUrl}/models/coupler.glb`) as any;

	const stealTexture = useTexture(`${baseUrl}/textures/metal2.0/NormalSteal.jpg`);

	// const metalMatcap = useTexture(`${baseUrl}/matcaps/steal6.png`);

	const metal = new THREE.MeshStandardMaterial({
		normalMap: stealTexture,
		color: "#88888b",
		metalness: 0.8,
		roughness: 0.4
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

	return (
		<group
		scale={[0.13, 0.15, 0.11]}
		position={[-frameLength / 2 - 0.815, -0.102 + 0.015, 0]}
		castShadow
		>
			<primitive object={coupler.scene} castShadow/>
		</group>
	);
}
