import * as THREE from "three";
import { useMemo, useEffect } from "react";
import { useTexture } from "@react-three/drei";
import { baseUrl } from "../../global";
import useMesurements from "../stores/useMeasurements.tsx";
import { shallow } from "zustand/shallow";
import useButtonState from "../stores/useButtonState.tsx";

export default function Tailgate() {
	/**
	 * AFMETINGEN
	 */
	// LENGTE Frame
	const {frameLength, frameWidth, plankHeight} = useMesurements(
		(state) => {
			return {
				frameLength: state.frameLength,
				frameWidth: state.frameWidth,
				plankHeight: state.plankHeight,
			}},
		shallow
	);

	const {gateOpen} = useButtonState(
		(state) => {
			return {
				gateOpen: state.gateOpen,
			};
		},
		shallow
	);

	/**
	 * TEXTURES
	 */
	const metalTexture = useTexture({
		map: `${baseUrl}/textures/metal2.0/concrete_floor_02_diff_4k_2.0.jpg`,
		normalMap: `${baseUrl}/textures/metal/concrete_floor_worn_001_nor_gl_4k.jpg`,
		roughnessMap: `${baseUrl}/textures/metal/concrete_floor_worn_001_rough_4k.jpg`,
		aoMap: `${baseUrl}/textures/metal/concrete_floor_worn_001_ao_4k.jpg`,
	});

	Object.values(metalTexture).forEach((texture) => {
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(1.5, 0.2);
	});

	/**
	 * MESHES
	 */
	const geometry = useMemo(() => {
		const geo = new THREE.BoxGeometry();
		return geo;
	}, []);
	const cylinder = useMemo(() => {
		const geo = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
		return geo;
	}, []);

	const material2 = useMemo(() => {
		const mat = new THREE.MeshStandardMaterial({
			...metalTexture,
			color: "#DDDDDD",
			roughness: 0.2,
			metalness: 0.4,
		});
		return mat;
	}, [metalTexture]);

	useEffect(() => {
		return () => {
			geometry.dispose();
			cylinder.dispose();
			material2.dispose();
		};
	}, [geometry, cylinder, material2]);

	return (
		<>
			<group name="hinge-left" position-z={frameWidth / 3 - 0.05}>
				<mesh
					name="cylinder"
					geometry={cylinder}
					material={material2}
					rotation={[Math.PI * 0.5, 0, 0]}
					position={[frameLength / 2 + 0.01, 0, 0 - 0.1]}
					scale={[0.01, 0.08, 0.01]}
				/>
				<mesh
					name="block"
					geometry={geometry}
					material={material2}
					rotation={[Math.PI * 0.5, 0, 0]}
					position={[frameLength / 2 + 0.01, 0, 0 - 0.13]}
					scale={[0.02, 0.05, 0.02]}
				/>
				<mesh
					name="bar"
					geometry={geometry}
					material={material2}
					position={[
						frameLength / 2 + 0.01,
						gateOpen ? - (plankHeight / 2 + 0.01) : plankHeight / 2 + 0.01,
						0 - 0.075
					]}
					scale={[0.02, plankHeight + 0.03, 0.03]}
				/>
			</group>

			<group name="hinge-right" position-z={-frameWidth / 3 + 0.05} rotation={[0, Math.PI, 0]}>
				<mesh
					name="cylinder"
					geometry={cylinder}
					material={material2}
					rotation={[Math.PI * 0.5, 0, 0]}
					position={[-(frameLength / 2) - 0.01, 0, 0 - 0.1]}
					scale={[0.01, 0.08, 0.01]}
				/>
				<mesh
					name="block"
					geometry={geometry}
					material={material2}
					rotation={[Math.PI * 0.5, 0, 0]}
					position={[-(frameLength / 2) - 0.01, 0, 0 - 0.13]}
					scale={[0.02, 0.05, 0.02]}
				/>
				<mesh
					name="bar"
					geometry={geometry}
					material={material2}
					position={[
						- (frameLength / 2 + 0.01),
						gateOpen ? - (plankHeight / 2 + 0.01) : plankHeight / 2 + 0.01,
						0 - 0.075
					]}
					scale={[0.02, plankHeight + 0.03, 0.03]}
				/>
			</group>
			<mesh
				name="bar"
				geometry={geometry}
				material={material2}
				rotation={[Math.PI * 0.5, Math.PI * 0.5, 0]}
				position={
					gateOpen ?
					[frameLength / 2 + 0.01, - (plankHeight + 0.03), 0]
					:
					[frameLength / 2, plankHeight + 0.03, 0]
				}
				scale={gateOpen ? [0.04, frameWidth, 0.02] : [0.02, frameWidth, 0.04]}
			/>
			<mesh
				name="bar-small-left"
				geometry={geometry}
				material={material2}
				rotation={[Math.PI * 0.5, Math.PI * 0.5, 0]}
				position={[
					frameLength / 2 + 0.0025,
					gateOpen ? - (plankHeight + 0.03) : plankHeight + 0.03,
					frameWidth / 2 + 0.03
				]}
				scale={[0.015, 0.06, 0.005]}
			/>
			<mesh
				name="bar-small-right"
				geometry={geometry}
				material={material2}
				rotation={[Math.PI * 0.5, Math.PI * 0.5, 0]}
				position={[
					frameLength / 2 + 0.0025,
					gateOpen ? - (plankHeight + 0.03) : plankHeight + 0.03,
					-(frameWidth / 2 + 0.03)
				]}
				scale={[0.015, 0.06, 0.005]}
			/>
		</>
	);
}
