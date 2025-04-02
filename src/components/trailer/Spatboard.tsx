import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

import useMeasurements from "../stores/useMeasurements";
import { baseUrl } from "../../global";

export default function Spatboard() {
	/**
	 * MEASUREMENTS
	 */
	const frameWidth = useMeasurements((state) => {
		return state.frameWidth;
	});
	const frameLength = useMeasurements((state) => {
		return state.frameLength;
	});

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
		texture.wrapS = THREE.MirroredRepeatWrapping;
		texture.wrapT = THREE.MirroredRepeatWrapping;
		texture.repeat.set(1.5, 1);
	});

	// GEOMETRIES
	const cylinderEnkelAs = useMemo(() => {
		const geo = new THREE.CylinderGeometry(0.5, 0.5, 1, 32, 1, true, 0, Math.PI);
		return geo;
	}, []);
	const cylinderTweeAs = useMemo(() => {
		const geo = new THREE.CylinderGeometry(0.5, 0.5, 1, 32, 1, true, 0, Math.PI * 0.5);
		return geo;
	}, []);
	const ringEnkelAs = useMemo(() => {
		const geo = new THREE.RingGeometry(0.4, 0.5, 32, 2, 0.025, Math.PI - 0.05);
		return geo;
	}, []);
	const ringTweeAs = useMemo(() => {
		const geo = new THREE.RingGeometry(0.4, 0.5, 32, 2, 0.025, Math.PI * 0.5 - 0.05);
		return geo;
	}, []);
	const middenVlak = useMemo(() => {
		const geo = new THREE.PlaneGeometry(1, 1);
		return geo;
	}, []);

	// MATERIALS
	const material = useMemo(() => {
		const mat = new THREE.MeshStandardMaterial({
			...metalTexture,
			// color: "#bbbbbb",
			color: "#999999",
			roughness: 0.8,
			metalness: 0,
			side: THREE.DoubleSide,
		});
		return mat;
	}, [metalTexture]);

	// dispose
	useEffect(() => {
		return () => {
			cylinderEnkelAs.dispose();
			ringEnkelAs.dispose();
			cylinderTweeAs.dispose();
			ringTweeAs.dispose();
			middenVlak.dispose();
		};
	}, [cylinderEnkelAs, ringEnkelAs, cylinderTweeAs, ringTweeAs, middenVlak]);

	return (
		<>
			<group position={[0, 0.02, 0]} scale={[1.1, 1.2, 1]}>
				{frameLength <= 3 ? (
					<>
						<group>
							<mesh
								name="top-left"
								geometry={cylinderEnkelAs}
								material={material}
								rotation={[Math.PI * 0.5, Math.PI * 0.5, 0]}
								position={[0, -0.15, frameWidth / 2 + 0.16]}
								scale={[0.6, 0.25, 0.7]}
							/>
							<mesh
								name="side-left"
								geometry={ringEnkelAs}
								material={material}
								rotation={[0, 0, 0]}
								position={[0, -0.156, frameWidth / 2 + 0.285]}
								scale={[0.705, 0.615, 0.7]}
							/>
						</group>
						<group>
							<mesh
								name="top-right"
								receiveShadow
								geometry={cylinderEnkelAs}
								material={material}
								rotation={[Math.PI * 0.5, Math.PI * 0.5, 0]}
								position={[0, -0.15, -(frameWidth / 2 + 0.16)]}
								scale={[0.6, 0.25, 0.7]}
							/>
							<mesh
								name="side-right"
								receiveShadow
								geometry={ringEnkelAs}
								material={material}
								position={[0, -0.156, -(frameWidth / 2 + 0.285)]}
								scale={[0.705, 0.615, 0.7]}
							/>
						</group>
					</>
				) : (
					<>
						<group>
							<mesh
								name="top-left-back"
								geometry={cylinderTweeAs}
								material={material}
								rotation={[Math.PI * 0.5, Math.PI * 0.5, 0]}
								position={[0.35, -0.15, frameWidth / 2 + 0.16]}
								scale={[0.6, 0.25, 0.7]}
							/>
							<mesh
								name="side-left-back"
								geometry={ringTweeAs}
								material={material}
								position={[0.35, -0.156, frameWidth / 2 + 0.285]}
								scale={[0.705, 0.615, 0.7]}
							/>
							<mesh
								name="side-left-Middle"
								geometry={middenVlak}
								material={material}
								position={[0, 0.12, frameWidth / 2 + 0.285]}
								scale={[0.75, 0.0625, 1]}
							/>
							<mesh
								name="side-left-Middle"
								geometry={middenVlak}
								material={material}
								rotation-x={Math.PI * 0.5}
								position={[0, 0.151, frameWidth / 2 + 0.16]}
								scale={[0.75, 0.25, 1]}
							/>

							<mesh
								name="top-left-front"
								geometry={cylinderTweeAs}
								material={material}
								rotation={[0, -Math.PI * 0.5, Math.PI * 0.5]}
								position={[-0.35, -0.15, frameWidth / 2 + 0.16]}
								scale={[0.6, 0.25, 0.7]}
							/>
							<mesh
								name="side-left-front"
								geometry={ringTweeAs}
								material={material}
								rotation-y={Math.PI}
								position={[-0.35, -0.156, frameWidth / 2 + 0.285]}
								scale={[0.705, 0.615, 0.7]}
							/>
						</group>
						<group>
							<mesh
								name="top-right-back"
								receiveShadow
								geometry={cylinderTweeAs}
								material={material}
								rotation={[Math.PI * 0.5, Math.PI * 0.5, 0]}
								position={[0.35, -0.15, -(frameWidth / 2 + 0.16)]}
								scale={[0.6, 0.25, 0.7]}
							/>
							<mesh
								name="side-right-back"
								receiveShadow
								geometry={ringTweeAs}
								material={material}
								position={[0.35, -0.156, -(frameWidth / 2 + 0.285)]}
								scale={[0.705, 0.615, 0.7]}
							/>
							<mesh
								name="side-right-Middle"
								receiveShadow
								geometry={middenVlak}
								material={material}
								position={[0, 0.12, -(frameWidth / 2 + 0.285)]}
								scale={[0.75, 0.0625, 1]}
							/>
							<mesh
								name="side-right-Middle"
								receiveShadow
								geometry={middenVlak}
								material={material}
								rotation-x={Math.PI * 0.5}
								position={[0, 0.151, -(frameWidth / 2 + 0.16)]}
								scale={[0.75, 0.25, 1]}
							/>

							<mesh
								name="top-right-front"
								receiveShadow
								geometry={cylinderTweeAs}
								material={material}
								rotation={[0, -Math.PI * 0.5, Math.PI * 0.5]}
								position={[-0.35, -0.15, -(frameWidth / 2 + 0.16)]}
								scale={[0.6, 0.25, 0.7]}
							/>
							<mesh
								name="side-right-front"
								receiveShadow
								geometry={ringTweeAs}
								material={material}
								rotation-y={Math.PI}
								position={[-0.35, -0.156, -(frameWidth / 2 + 0.285)]}
								scale={[0.705, 0.615, 0.7]}
							/>
						</group>
					</>
				)}
			</group>
		</>
	);
}
