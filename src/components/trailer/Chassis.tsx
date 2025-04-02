import * as THREE from "three";
import React, { useMemo, useEffect } from "react";
import { useTexture } from "@react-three/drei";
import { shallow } from "zustand/shallow";
import useMeasurements from "../stores/useMeasurements.tsx";
import useButtonState from "../stores/useButtonState.tsx";
import { baseUrl } from "../../global.ts";

export default function Chassis() {
	/**
	 * AFMETINGEN
	 */
	const { frameLength, frameWidth, plankHeight } = useMeasurements(
		(state) => ({
			frameLength: state.frameLength,
			frameWidth: state.frameWidth,
			plankHeight: state.plankHeight,
		}),
		shallow
	);
	const meshSideState = useButtonState((state) => state.meshSideState);

	const aantalSteunLatten = Math.floor(frameLength * 2);
	const startX = -frameLength / 2 + 0.5;

	/**
	 * TEXTURES
	 */
	const metalTexture = useTexture({
		map: `${baseUrl}/textures/metal2.0/concrete_floor_02_diff_4k_2.0.jpg`,
		normalMap: `${baseUrl}/textures/metal/concrete_floor_worn_001_nor_gl_4k.jpg`,
		roughnessMap: `${baseUrl}/textures/metal2.0/concrete_floor_02_rough_4k.jpg`,
		aoMap: `${baseUrl}/textures/metal/concrete_floor_worn_001_ao_4k.jpg`,
	});
	Object.values(metalTexture).forEach((texture) => {
		texture.wrapS = THREE.MirroredRepeatWrapping;
		texture.wrapT = THREE.MirroredRepeatWrapping;
		texture.repeat.set(1.5, 0.2);
	});

	/**
	 * MODELS
	 */

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

	const material = useMemo(() => {
		const mat = new THREE.MeshStandardMaterial({
			...metalTexture,
			color: "#ffffff",
			roughness: 0.6,
			metalness: 0.6,
		});
		return mat;
	}, [metalTexture]);

	useEffect(() => {
		return () => {
			geometry.dispose();
			material.dispose();
			cylinder.dispose();
		};
	}, [geometry, material, cylinder]);

	return (
		<>
			<group>
				{/* LEFT SIDE */}
				<mesh
					name="bottom"
					castShadow
					receiveShadow
					geometry={geometry}
					material={material}
					position={[0, 0, frameWidth / 2 + 0.025]}
					scale={[frameLength - 0.01, 0.048, 0.048]}
				/>
				<mesh
					name="top"
					castShadow
					receiveShadow
					geometry={geometry}
					material={material}
					position={[0, plankHeight + 0.1, frameWidth / 2 + 0.03]}
					scale={[frameLength, 0.04, 0.02]}
				/>
				{/* LEFT Corners */}
				<mesh
					name="front"
					castShadow
					geometry={geometry}
					material={material}
					position={[-(frameLength - 0.02) / 2, (plankHeight + 0.55) / 2, (frameWidth + 0.06) / 2]}
					rotation={[Math.PI * 0.5, Math.PI * 0.5, 0]}
					scale={[plankHeight + 0.6, 0.04, 0.02]}
				/>
				<mesh
					name="back"
					geometry={geometry}
					material={material}
					position={[(frameLength - 0.05) / 2, (plankHeight + 0.15) / 2, -(frameWidth + 0.05) / 2]}
					rotation={[Math.PI * 0.5, Math.PI * 0.5, 0]}
					scale={[plankHeight + 0.1, 0.05, 0.05]}
				/>
				{/* RIGHT SIDE */}
				<mesh
					name="bottom"
					castShadow
					geometry={geometry}
					material={material}
					position={[0, 0, -frameWidth / 2 - 0.025]}
					scale={[frameLength - 0.01, 0.048, 0.048]}
				/>
				<mesh
					name="top"
					castShadow
					geometry={geometry}
					material={material}
					position={[0, plankHeight + 0.1, -frameWidth / 2 - 0.03]}
					scale={[frameLength, 0.04, 0.02]}
				/>
				{/* RIGHT Corners */}
				<mesh
					name="front"
					castShadow
					geometry={geometry}
					material={material}
					position={[-(frameLength - 0.02) / 2, (plankHeight + 0.55) / 2, -(frameWidth + 0.06) / 2]}
					rotation={[Math.PI * 0.5, Math.PI * 0.5, 0]}
					scale={[plankHeight + 0.6, 0.04, 0.02]}
				/>
				<mesh
					name="back"
					geometry={geometry}
					material={material}
					position={[(frameLength - 0.05) / 2, (plankHeight + 0.15) / 2, (frameWidth + 0.05) / 2]}
					rotation={[Math.PI * 0.5, Math.PI * 0.5, 0]}
					scale={[plankHeight + 0.1, 0.05, 0.05]}
				/>
				{/* FRONT SIDE */}
				<mesh
					name="bottom"
					castShadow
					receiveShadow
					geometry={geometry}
					material={material}
					position={[-(frameLength / 2) + 0.025, 0, 0]}
					rotation={[0, Math.PI / 2, 0]}
					scale={[frameWidth + 0.02, 0.05, 0.05]}
				/>
				<mesh
					name="middle"
					castShadow
					receiveShadow
					geometry={geometry}
					material={material}
					position={[-(frameLength / 2) + 0.01, plankHeight + 0.1, 0]}
					rotation={[0, Math.PI / 2, 0]}
					scale={[frameWidth + 0.025, 0.05, 0.02]}
				/>
				<mesh
					name="top"
					castShadow
					receiveShadow
					geometry={geometry}
					material={material}
					position={[-(frameLength / 2) + 0.01, meshSideState ? plankHeight + 0.55 : plankHeight + 0.5, 0]}
					rotation={[0, Math.PI / 2, 0]}
					scale={[frameWidth + 0.025, 0.05, 0.02]}
				/>
				{/* BACK SIDE */}
				<mesh
					castShadow
					geometry={geometry}
					material={material}
					position={[frameLength / 2 - 0.025, -0.05, 0]}
					rotation={[0, Math.PI / 2, 0]}
					scale={[frameWidth + 0.1, 0.15, 0.05]}
				/>

				{/* STEUN LATTEN */}
				{Array.from({ length: aantalSteunLatten }).map((_, i) => {
					const positionX = startX + i * 0.5;

					return (
						<React.Fragment key={`steunlatten-${i}`}>
							<mesh
								key={`lat-horizontaal-${i}`}
								geometry={geometry}
								material={material}
								position={[positionX - 0.05, 0, 0]}
								rotation={[0, Math.PI * 0.5, 0]}
								scale={[frameWidth, 0.05, 0.05]}
							/>
							<mesh
								key={`lat-verticaal-links-${i}`}
								geometry={geometry}
								material={material}
								position={[positionX - 0.05, (plankHeight + 0.14) / 2, (frameWidth + 0.1) / 2]}
								rotation={[Math.PI * 0.5, Math.PI * 0.5, 0]}
								scale={[plankHeight + 0.1, 0.02, 0.02]}
							/>
							<mesh
								key={`lat-verticaal-rechts-${i}`}
								geometry={geometry}
								material={material}
								position={[positionX - 0.05, (plankHeight + 0.14) / 2, -(frameWidth + 0.1) / 2]}
								rotation={[Math.PI * 0.5, Math.PI * 0.5, 0]}
								scale={[plankHeight + 0.1, 0.02, 0.02]}
							/>
						</React.Fragment>
					);
				})}
			</group>

			{/* TRIANGLE BARS */}
			<group scale={[1, 1, 1]} position={[0, -0.065, 0]}>
				<mesh
					castShadow
					receiveShadow
					geometry={geometry}
					material={material}
					position={[-frameLength / 2 - 0.13, 0, -0.25]}
					rotation-y={Math.PI * 0.115}
					scale={[1.4, 0.08, 0.05]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={geometry}
					material={material}
					position={[-frameLength / 2 - 0.13, 0, 0.25]}
					rotation-y={-Math.PI * 0.115}
					scale={[1.4, 0.08, 0.05]}
				/>
				{/* MIDDLE */}
				<mesh
					castShadow
					receiveShadow
					geometry={geometry}
					material={material}
					position={[-frameLength / 2 - 0.15, 0, 0]}
					scale={[1.3, 0.08, 0.05]}
				/>
			</group>
		</>
	);
}
