import { useGLTF, useTexture } from "@react-three/drei";
import { baseUrl } from "../../global";
import useMeasurements from "../stores/useMeasurements";
import { shallow } from "zustand/shallow";
import * as THREE from "three";
import useNormalBasedCubeUVs from "../hooks/useNormalBasedCubeUvs";

export default function Nose() {

	//stores
	const {frameLength} = useMeasurements(
		(state) => ({
			frameLength: state.frameLength,
		}),
		shallow
	);
	const coupler = useGLTF(`${baseUrl}/models/coupler3.0.glb`) as any;
	
	const couplerRubber = useGLTF(`${baseUrl}/models/coupler-rubber.glb`) as any;

	
	const {nodes, /*materials*/} = useGLTF(`${baseUrl}/models/coupler4.0.glb`) as any;
	useNormalBasedCubeUVs(nodes.Cube007.geometry)
	useNormalBasedCubeUVs(nodes.Cube002.geometry)
	useNormalBasedCubeUVs(nodes.Cube003.geometry)
	useNormalBasedCubeUVs(nodes.Cylinder013.geometry)
	useNormalBasedCubeUVs(nodes.Cube008.geometry)

	const stealTexture = useTexture(`${baseUrl}/textures/metal/math-metal-col4.jpg`);
	stealTexture.colorSpace = THREE.SRGBColorSpace;
	stealTexture.wrapS = THREE.RepeatWrapping;
	stealTexture.wrapT = THREE.RepeatWrapping;
	stealTexture.repeat = new THREE.Vector2(0.5, 1);

	const schroefTexture = useTexture(`${baseUrl}/textures/metal/math-metal-col3.jpg`);
	schroefTexture.colorSpace = THREE.SRGBColorSpace;
	schroefTexture.repeat = new THREE.Vector2(0.7, 0.7);

	const metalMatcap = useTexture(`${baseUrl}/matcaps/steal3.3.png`);
	
	const metalMatcap2 = useTexture(`${baseUrl}/matcaps/steal3.4.png`);

	// const metal = new THREE.MeshMatcapMaterial({
	// 	// map: stealTexture,
	// 	matcap: metalMatcap,
	// 	color: "#f5f5ff",
	// 	// metalness: 0.8,
	// 	// roughness: 0.2
	// });

	const metal = new THREE.MeshStandardMaterial({
		color: '#e0d9e5',
		metalness: 0.8,
		roughness: 0.4,
		map: metalMatcap2,
		side: THREE.DoubleSide,
	});

	const rubber = new THREE.MeshStandardMaterial({
		color: "#333333",
		metalness: 0.7,
		roughness: 0.5
	});
	// const metal = new THREE.MeshStandardMaterial({
	// 	// map: stealTexture,
	// 	// matcap: metalMatcap,
	// 	color: "#96939c",
	// 	metalness: 1,
	// 	roughness: 0.6
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

	// const koppelstukMaterial = new THREE.MeshMatcapMaterial({
	// 	matcap: metalMatcap,
	// 	color: 'rgb(255, 255, 255)',
	// 	// metalness: 0.8,
	// 	// roughness: 0.4,
	// 	map: stealTexture,
	// 	side: THREE.DoubleSide,
	// });

	// const hendelMaterial = new THREE.MeshStandardMaterial({
	// 	map: stealTexture,
	// 	// matcap: metalMatcap,
	// 	color: "rgb(170, 170, 170)",
	// 	metalness: 0.8,
	// 	roughness: 0.6
	// });

	// const plaatjesMaterial = new THREE.MeshStandardMaterial({
	// 	color: 'rgb(255, 255, 255)',
	// 	metalness: 0.8,
	// 	roughness: 0.4,
	// 	map: metalMatcap2,
	// 	side: THREE.DoubleSide,
	// });

	const schroefMaterial = new THREE.MeshMatcapMaterial({
		matcap: metalMatcap,
		color: 'rgb(214, 221, 224)',
		side: THREE.DoubleSide,
	});


	return (
		<group
		scale={[0.11, 0.14, 0.11]}
		position={[-frameLength / 2 - 0.985, -0.027, 0]}
		castShadow
		>
			<primitive object={couplerRubber.scene} castShadow/>
			<primitive object={coupler.scene} castShadow/>
			<group>
				{/* <mesh
					castShadow
					receiveShadow
					geometry={nodes.Cube008.geometry}
					material={hendelMaterial}
					position={[0.194, 0.2, -0.009]}
					rotation={[-Math.PI, 0, 2.975]}
					scale={[0.108, 0.108, 0.15]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Cube002.geometry}
					material={plaatjesMaterial}
					position={[0.155, 0.505, 0.132]}
					scale={[0.147, 0.114, 0.019]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Cube003.geometry}
					material={hendelMaterial}
					position={[0.194, 0.2, -0.009]}
					rotation={[-Math.PI, 0, -0.166]}
					scale={[-0.108, -0.108, -0.147]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Cylinder013.geometry}
					material={materials.Material}
					position={[2.535, 0.212, 0]}
					rotation={[0, 0, -Math.PI / 2]}
					scale={[0.206, 0.223, 0.23]}
				/> */}
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Cylinder010.geometry}
					material={schroefMaterial}
					position={[0.153, 0.59, -0.165]}
					rotation={[Math.PI / 2, Math.PI / 2, 0]}
					scale={[-0.065, -0.0179, -0.059]}
				/>
				{/* <mesh
					castShadow
					receiveShadow
					geometry={nodes.Cube007.geometry}
					material={koppelstukMaterial}
					scale={[0.86, 0.207, 0.352]}
				/> */}
			</group>
		</group>
	);
}

useGLTF.preload(`${baseUrl}/models/coupler3.0.glb`)
useGLTF.preload(`${baseUrl}/models/coupler-rubber.glb`)
useGLTF.preload(`${baseUrl}/models/coupler4.0.glb`)