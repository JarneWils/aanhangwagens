import { /*Instance, Instances,*/ useGLTF, useTexture } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import * as THREE from "three";

import useMeasurements from "../stores/useMeasurements";
import useButtonState from "../stores/useButtonState";
import { shallow } from "zustand/shallow";
import { baseUrl } from "../../global";
export default function Wheels() {
	/**
	 * AFMETINGEN
	 */
	// LENGTE
	const { frameWidth, frameLength, plankHeight } = useMeasurements(
		(state) => ({
			frameWidth: state.frameWidth,
			frameLength: state.frameLength,
			plankHeight: state.plankHeight,
		}),
		shallow
	);

	// FULL SCREEN
	const { spareWheel } = useButtonState((state) => ({
		spareWheel: state.spareWheel,
	}));

	// Wiel position
	const wheelPositionX = 50;

	const buis = useMemo(() => {
		const geo = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
		return geo;
	}, []);
	const schijf = useMemo(() => {
		const geo = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
		return geo;.2
	}, []);

	const metalMatcap = useTexture(`${baseUrl}/matcaps/steal3.6.png`);


	// const tireMaterial = useMemo(() => {
	// 	const mat = new THREE.MeshMatcapMaterial({
	// 		color: '#faf6ff',
	// 		matcap: metalMatcap,
	// 		side: THREE.DoubleSide,
	// 	})
	// 	return mat
	// }, [])
	const tireMaterial = useMemo(() => {
		const mat = new THREE.MeshStandardMaterial({
			color: '#aaaaaf',
			metalness: 0.7,
			roughness: 0.3,
			map: metalMatcap,
			side: THREE.DoubleSide,
		})
		return mat
	}, [])

	const rimMaterial = useMemo(() => {
		const mat = new THREE.MeshStandardMaterial({
			color: '#3a3a3a',
			roughness: 1,
			metalness: 0,
			side: THREE.DoubleSide,
		})
		return mat
	}, [])

	
	const iron2 = useMemo(() => {
		const mat = new THREE.MeshMatcapMaterial({
			color: 'rgb(230, 234, 236)',
			matcap: metalMatcap,
			side: THREE.DoubleSide,
		})
		return mat
	}, [])
	const iron = useMemo(() => {
		const mat = new THREE.MeshStandardMaterial({
			color: 'rgb(255, 255, 255)',
			metalness: 0.6,
			roughness: 0.3,
			map: metalMatcap,
			side: THREE.DoubleSide,
		})
		return mat
	}, [])

	const gold = useMemo(() => {
		const mat = new THREE.MeshMatcapMaterial({
			color: 'rgb(242, 242, 242)',
			matcap: metalMatcap,
			side: THREE.DoubleSide,
		})
		return mat
	}, [])

	const rubber = useMemo(() => {
		const mat = new THREE.MeshStandardMaterial({
			color: '#3a3a3a',
			roughness: 1,
			metalness: 0,
			side: THREE.DoubleSide,
		})
		return mat
	}, [])

	useEffect(() => {
		return () => {
			buis.dispose();
			schijf.dispose();
			iron.dispose();
			gold.dispose();
			rubber.dispose();
		};
	}, [buis, schijf, iron, gold, rubber]);

	// MODEL
	const { nodes, /* materials */ } = useGLTF(`${baseUrl}/models/tire-v1.glb`) as any;
	const tireGeometry = useMemo(() => nodes.Circle002.geometry, [nodes]);
	// const tireMaterial = useMemo(() => materials["Material.001"], [materials]);
	const rimGeometry = useMemo(() => nodes.Cube002.geometry, [nodes]);
	// const rimMaterial = useMemo(() => materials["Material.002"], [materials]);

	const {nodes: nodes2} = useGLTF(`${baseUrl}/models/wheel2.0.glb`) as any;



	return (
		<>
			
			<group position-x={frameLength > 2.7 ? -0.3 : 0}>

				{/* Linker wiel */}
				{/* <group
					dispose={null}
					scale={0.15}
					position={[frameLength / 2 - (frameLength / 100) * wheelPositionX, -0.2, frameWidth / 2 + 0.15]}
				>
					<Instances
					castShadow
					receiveShadow
					geometry={tireGeometry}
					material={tireMaterial}>
						<Instance
						position={[0.004, -0.024, 0.138]}
						rotation={[0, -1.569, -1.574]}
						scale={1.475}
						/>
					</Instances>
						
					<Instances
					castShadow
					receiveShadow
					geometry={rimGeometry}
					material={rimMaterial}>
						<Instance
							position={[0.004, 0.012, -0.004]}
							rotation={[0, -1.569, -0.003]}
							scale={[0.09, 0.109, 0.042]}
						/>
					</Instances>
				</group> */}

				<group
				dispose={null}
				scale={0.475}
				position={[frameLength / 2 - (frameLength / 100) * wheelPositionX, -0.21, frameWidth / 2 + 0.15]}
				rotation-y={Math.PI}>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes2.Circle.geometry}
						material={rubber}
						position={[0, -0.001, 0.018]}
						rotation={[0, 1.569, -1.562]}
						scale={[0.6, 0.5, 0.6]}
					/>
					<group scale={[1.1,1.1,1.05]}>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes2.Circle002.geometry}
							material={iron2}
							position={[0.002, -0.002, 0.005]}
							rotation={[0, 1.569, -1.562]}
							scale={[0.308, 0.322, 0.308]}
						/>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes2.Circle003.geometry}
							material={gold}
							position={[0.006, 0, -0.156]}
							rotation={[1.567, 1.112, -3.138]}
							scale={[0.026, 0.016, 0.026]}
						/>
					</group>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes2.Circle004.geometry}
						material={gold}
						position={[-0.1, 0, 0.176]}
						rotation={[-1.574, -1.112, -0.004]}
						scale={-0.015}
					/>
				</group>

				{/* Rechter wiel */}
				{/* <group
					dispose={null}
					scale={0.15}
					position={[frameLength / 2 - (frameLength / 100) * wheelPositionX, -0.2, -(frameWidth / 2) - 0.15]}
					rotation-y={Math.PI}
				>
					<mesh
						castShadow
						receiveShadow
						geometry={tireGeometry}
						material={tireMaterial}
						position={[0.004, -0.024, 0.138]}
						rotation={[0, -1.569, -1.574]}
						scale={1.475}
						/>
					<mesh
						castShadow
						receiveShadow
						geometry={rimGeometry}
						material={rimMaterial}
						position={[0.004, 0.012, -0.004]}
						rotation={[0, -1.569, -0.003]}
						scale={[0.09, 0.109, 0.042]}
					/>
				</group> */}

				<group
				dispose={null}
				scale={0.475}
				position={[frameLength / 2 - (frameLength / 100) * wheelPositionX, -0.21, -(frameWidth / 2) - 0.15]}
				rotation-y={0}>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes2.Circle.geometry}
						material={rubber}
						position={[0, -0.001, 0.018]}
						rotation={[0, 1.569, -1.562]}
						scale={[0.6, 0.5, 0.6]}
					/>
					<group scale={[1.1,1.1,1.05]}>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes2.Circle002.geometry}
							material={iron2}
							position={[0.002, -0.002, 0.005]}
							rotation={[0, 1.569, -1.562]}
							scale={[0.308, 0.322, 0.308]}
						/>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes2.Circle003.geometry}
							material={gold}
							position={[0.006, 0, -0.156]}
							rotation={[1.567, 1.112, -3.138]}
							scale={[0.026, 0.016, 0.026]}
						/>
					</group>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes2.Circle004.geometry}
						material={gold}
						position={[-0.1, 0, 0.176]}
						rotation={[-1.574, -1.112, -0.004]}
						scale={-0.015}
					/>
				</group>

				{/* AS LEFT*/}
				<group position={[-0.05, 0, 0]}>
					<mesh
						name="buis"
						castShadow
						receiveShadow
						geometry={buis}
						material={rimMaterial}
						rotation-x={Math.PI * 0.5}
						scale={[0.15, frameWidth + 0.1, 0.15]}
						position={[0.15, -0.1, 0]}
					/>
					<mesh
						name="wheel-schijf1"
						castShadow
						receiveShadow
						geometry={schijf}
						material={rimMaterial}
						rotation-x={Math.PI * 0.5}
						scale={[0.15, 0.05, 0.15]}
						position={[0.15, -0.1, frameWidth / 2 + 0.075]}
					/>
					<mesh
						name="wheel-schijf2"
						castShadow
						receiveShadow
						geometry={schijf}
						material={rimMaterial}
						rotation-x={Math.PI * 0.5}
						rotation-y={Math.PI * 0.25}
						scale={[0.2, 0.05, 0.15]}
						position={[0.1, -0.15, frameWidth / 2 + 0.075]}
					/>
					<mesh
						name="wheel-dop"
						castShadow
						receiveShadow
						geometry={schijf}
						material={rimMaterial}
						rotation-x={Math.PI * 0.5}
						scale={[0.05, 0.15, 0.05]}
						position={[0.05, -0.2, frameWidth / 2 + 0.125]}
					/>
				</group>

				{/* AS RIGHT*/}
				<group position={[0.2, -0.25, 0]} rotation={[0, Math.PI, Math.PI * 0.5]}>
					<mesh
						name="wheel-schijf1"
						castShadow
						receiveShadow
						geometry={schijf}
						material={rimMaterial}
						rotation-x={Math.PI * 0.5}
						scale={[0.15, 0.05, 0.15]}
						position={[0.15, -0.1, frameWidth / 2 + 0.075]}
					/>
					<mesh
						name="wheel-schijf2"
						castShadow
						receiveShadow
						geometry={schijf}
						material={rimMaterial}
						rotation-x={Math.PI * 0.5}
						rotation-y={Math.PI * 0.25}
						scale={[0.2, 0.05, 0.15]}
						position={[0.1, -0.15, frameWidth / 2 + 0.075]}
					/>
					<mesh
						name="wheel-dop"
						castShadow
						receiveShadow
						geometry={schijf}
						material={rimMaterial}
						rotation-x={Math.PI * 0.5}
						scale={[0.05, 0.15, 0.05]}
						position={[0.05, -0.2, frameWidth / 2 + 0.125]}
					/>
				</group>
			</group>


			{frameLength > 2.7 ? (
				<group position-x={0.35}>
					{/* Linker wiel */}
					<group
					dispose={null}
					scale={0.47}
					position={[frameLength / 2 - (frameLength / 100) * wheelPositionX, -0.2, (frameWidth / 2) + 0.15]}
					rotation-y={Math.PI}>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes2.Circle.geometry}
							material={rubber}
							position={[0, -0.001, 0.018]}
							rotation={[0, 1.569, -1.562]}
							scale={[0.6, 0.5, 0.6]}
						/>
						<group scale={[1.1,1.1,1.05]}>
							<mesh
								castShadow
								receiveShadow
								geometry={nodes2.Circle002.geometry}
								material={iron2}
								position={[0.002, -0.002, 0.005]}
								rotation={[0, 1.569, -1.562]}
								scale={[0.308, 0.322, 0.308]}
							/>
							<mesh
								castShadow
								receiveShadow
								geometry={nodes2.Circle003.geometry}
								material={gold}
								position={[0.006, 0, -0.156]}
								rotation={[1.567, 1.112, -3.138]}
								scale={[0.026, 0.016, 0.026]}
							/>
						</group>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes2.Circle004.geometry}
							material={gold}
							position={[-0.1, 0, 0.176]}
							rotation={[-1.574, -1.112, -0.004]}
							scale={-0.015}
						/>
					</group>

					{/* Rechter wiel */}
					{/* <group
						dispose={null}
						scale={0.15}
						position={[frameLength / 2 - (frameLength / 100) * wheelPositionX, -0.2, -(frameWidth / 2) - 0.15]}
						rotation-y={Math.PI}
					>
						<mesh
							castShadow
							receiveShadow
							geometry={tireGeometry}
							material={tireMaterial}
							position={[0.004, -0.024, 0.138]}
							rotation={[0, -1.569, -1.574]}
							scale={1.475}
						/>
						<mesh
							castShadow
							receiveShadow
							geometry={rimGeometry}
							material={rimMaterial}
							position={[0.004, 0.012, -0.004]}
							rotation={[0, -1.569, -0.003]}
							scale={[0.09, 0.109, 0.042]}
						/>
					</group> */}
					<group
					dispose={null}
					scale={0.47}
					position={[frameLength / 2 - (frameLength / 100) * wheelPositionX, -0.2, - (frameWidth / 2 + 0.15) ]}
					rotation-y={0}>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes2.Circle.geometry}
							material={rubber}
							position={[0, -0.001, 0.018]}
							rotation={[0, 1.569, -1.562]}
							scale={[0.6, 0.5, 0.6]}
						/>
						<group scale={[1.1,1.1,1.05]}>
							<mesh
								castShadow
								receiveShadow
								geometry={nodes2.Circle002.geometry}
								material={iron2}
								position={[0.002, -0.002, 0.005]}
								rotation={[0, 1.569, -1.562]}
								scale={[0.308, 0.322, 0.308]}
							/>
							<mesh
								castShadow
								receiveShadow
								geometry={nodes2.Circle003.geometry}
								material={gold}
								position={[0.006, 0, -0.156]}
								rotation={[1.567, 1.112, -3.138]}
								scale={[0.026, 0.016, 0.026]}
							/>
						</group>
						<mesh
							castShadow
							receiveShadow
							geometry={nodes2.Circle004.geometry}
							material={gold}
							position={[-0.1, 0, 0.176]}
							rotation={[-1.574, -1.112, -0.004]}
							scale={-0.015}
						/>
					</group>

					{/* AS LEFT*/}
					<group position={[-0.05, 0, 0]}>
						<mesh
							name="buis"
							castShadow
							receiveShadow
							geometry={buis}
							material={rimMaterial}
							rotation-x={Math.PI * 0.5}
							scale={[0.15, frameWidth + 0.1, 0.15]}
							position={[0.15, -0.1, 0]}
						/>
						<mesh
							name="wheel-schijf1"
							castShadow
							receiveShadow
							geometry={schijf}
							material={rimMaterial}
							rotation-x={Math.PI * 0.5}
							scale={[0.15, 0.05, 0.15]}
							position={[0.15, -0.1, frameWidth / 2 + 0.075]}
						/>
						<mesh
							name="wheel-schijf2"
							castShadow
							receiveShadow
							geometry={schijf}
							material={rimMaterial}
							rotation-x={Math.PI * 0.5}
							rotation-y={Math.PI * 0.25}
							scale={[0.2, 0.05, 0.15]}
							position={[0.1, -0.15, frameWidth / 2 + 0.075]}
						/>
						<mesh
							name="wheel-dop"
							castShadow
							receiveShadow
							geometry={schijf}
							material={rimMaterial}
							rotation-x={Math.PI * 0.5}
							scale={[0.05, 0.15, 0.05]}
							position={[0.05, -0.2, frameWidth / 2 + 0.125]}
						/>
					</group>

					{/* AS RIGHT*/}
					<group position={[0.2, -0.25, 0]} rotation={[0, Math.PI, Math.PI * 0.5]}>
						<mesh
							name="wheel-schijf1"
							castShadow
							receiveShadow
							geometry={schijf}
							material={rimMaterial}
							rotation-x={Math.PI * 0.5}
							scale={[0.15, 0.05, 0.15]}
							position={[0.15, -0.1, frameWidth / 2 + 0.075]}
						/>
						<mesh
							name="wheel-schijf2"
							castShadow
							receiveShadow
							geometry={schijf}
							material={rimMaterial}
							rotation-x={Math.PI * 0.5}
							rotation-y={Math.PI * 0.25}
							scale={[0.2, 0.05, 0.15]}
							position={[0.1, -0.15, frameWidth / 2 + 0.075]}
						/>
						<mesh
							name="wheel-dop"
							castShadow
							receiveShadow
							geometry={schijf}
							material={rimMaterial}
							rotation-x={Math.PI * 0.5}
							scale={[0.05, 0.15, 0.05]}
							position={[0.05, -0.2, frameWidth / 2 + 0.125]}
						/>
					</group>
				</group>
			) : null}
			{/* RESERVE WIEL */}
			console.log(spareWheel)
			<group
				visible={spareWheel}
				dispose={null}
				scale={0.15}
				position={[
					plankHeight >= 0.3 ? -frameLength / 2 - 0.08 : -frameLength / 2 - 0.08,
					plankHeight >= 0.3 ? plankHeight + 0.1 : -0.17,
					0,
				]}
				rotation={[Math.PI * 0.5, plankHeight >= 0.3 ? Math.PI * 0.5 : 0, 0]}
			>
				<mesh
					castShadow
					receiveShadow
					geometry={tireGeometry}
					material={tireMaterial}
					position={[0.004, -0.024, 0.138]}
					rotation={[0, -1.569, -1.574]}
					scale={1.475}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={rimGeometry}
					material={rimMaterial}
					position={[0.004, 0.012, -0.004]}
					rotation={[0, -1.569, -0.003]}
					scale={[0.09, 0.109, 0.042]}
				/>
			</group>
		</>
	);
}

useGLTF.preload(`${baseUrl}/models/tire.glb`);
useGLTF.preload(`${baseUrl}/models/wheel2.0.glb`);
