import useMeasurements from "../stores/useMeasurements";
import { useGLTF, useTexture } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import useButtonState from "../stores/useButtonState";
import { baseUrl } from "../../global";
import useNormalBasedCubeUVs from "../hooks/useNormalBasedCubeUvs";

export default function TrailerNose() {
	/**
	 * TEXTURES
	 */
	const metalTexture = useTexture({
		map: `${baseUrl}/textures/metal2.0/concrete_floor_02_diff_4k_2.0.jpg`,
		roughnessMap: `${baseUrl}/textures/metal/concrete_floor_worn_001_rough_4k.jpg`,
		aoMap: `${baseUrl}/textures/metal/concrete_floor_worn_001_ao_4k.jpg`,
	});

	Object.values(metalTexture).forEach((texture) => {
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(1.5, 0.2);
	});

	
	const stealTexture = useTexture(`${baseUrl}/textures/metal2.0/NormalSteal.jpg`);
	stealTexture.wrapS = THREE.RepeatWrapping;
	stealTexture.wrapT = THREE.RepeatWrapping;
	stealTexture.repeat.set(1, 1);

	const stealMatcap = useTexture(`${baseUrl}/matcaps/steal6.2.png`);
	stealMatcap.colorSpace = THREE.SRGBColorSpace;

	const metalTexture2 = useTexture({
		map: `${baseUrl}/textures/metal2.0/concrete_floor_02_diff_4k_2.0.jpg`,
		normalMap: `${baseUrl}/textures/metal/concrete_floor_worn_001_nor_gl_4k.jpg`,
		// roughnessMap: `${baseUrl}/textures/metal2.0/concrete_floor_02_rough_4k.jpg`,
		// aoMap: `${baseUrl}/textures/metal/concrete_floor_worn_001_ao_4k.jpg`,
	});
	Object.values(metalTexture2).forEach((texture) => {
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(2, 2.5);
	});

	// const metal = useMemo(() => {
	// 	const mat = new THREE.MeshMatcapMaterial({
	// 		matcap: stealMatcap,
	// 		color: "#cccccc",
	// 	});
	// 	return mat;
	// }, [metalTexture]);

	const metal = useMemo(() => {
		const mat = new THREE.MeshStandardMaterial({
			roughnessMap: metalTexture.roughnessMap,
			aoMap: metalTexture.aoMap,
			color: "#99999f",
			metalness: 0.8,
			roughness: 0.3,
		});
		return mat;
	}, [metalTexture]);
	

	// const metal = new THREE.MeshStandardMaterial({
	// 	normalMap: stealTexture,
	// 	color: "#88888b",
	// 	metalness: 0.8,
	// 	roughness: 0.4
	// });


	const rubber = useMemo(() => {
		const mat = new THREE.MeshStandardMaterial({
			color: "#232323",
			roughness: 0.5,
			metalness: 0,
		});
		return mat;
	}, []);

	const materialUv = useMemo(() => {
		const mat = new THREE.MeshMatcapMaterial({
			... metalTexture2,
			color: "#ffffff",
			matcap: stealMatcap,
		});
		return mat;
	}, [metalTexture2, stealMatcap]);


	const { nodes } = useGLTF(`${baseUrl}/models/trekhaak.glb`) as any;

	const frameLength = useMeasurements((state: { frameLength: number }) => state.frameLength);
	const jockeyWheel = useButtonState((state) => {
		return state.jockeyWheel;
	});

	const cylinder = new THREE.CylinderGeometry(0.018, 0.018, 0.28, 32,);
	useNormalBasedCubeUVs(cylinder);
	

	return (
		<>
			<group rotation-y={-Math.PI * 0.5} position={[-frameLength / 2 - 0.5, 0.02, 0]} scale={1.15}>
				<group rotation={[Math.PI / 2, 0, 0]} scale={0.361}>
					{/* <group position={[0, -0.02, 0.178]}>
						<mesh
							name="trekhhaak-hendel"
							castShadow
							receiveShadow
							geometry={nodes.handle_low.geometry}
							material={metal}
						/>
						<mesh
							name="trekhaak-blok"
							castShadow
							receiveShadow
							geometry={nodes.uchyt_low.geometry}
							material={metal}
							scale={[0.75, 1, 1]}
							position={[0, -0.01, 0.02]}
						/>
					</group> */}

					{jockeyWheel ? (
						<group name="Wieletje" position={[0.115, -0.21, 0.2]}>
							<mesh castShadow receiveShadow geometry={nodes.kolecko_low.geometry} material={rubber} />
							<mesh castShadow receiveShadow geometry={nodes.nozicka_low.geometry} material={metal} scale={[0.8, 0.8, 1.05]} position={[0, 0, -0.04]}/>
							<mesh castShadow receiveShadow geometry={cylinder} material={materialUv} scale={3} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.005, 0.01]}/>
						</group>
					) : null}
					<group position={[0, -0.66, 0.095]} scale={[1, 1, 1.2]}>
						<mesh name="kabel" castShadow receiveShadow geometry={nodes.kabel_low.geometry} material={rubber} />
						<mesh name="stekker" castShadow receiveShadow geometry={nodes.zasuvka_low.geometry} material={rubber} />
					</group>
				</group>
			</group>
		</>
	);
}

useGLTF.preload(`${baseUrl}/models/trekhaak.glb`);
useGLTF.preload(`${baseUrl}/models/coupler.glb`);
