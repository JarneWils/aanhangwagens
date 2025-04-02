import { useGLTF } from "@react-three/drei";
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
		return geo;
	}, []);

	useEffect(() => {
		return () => {
			buis.dispose();
			schijf.dispose();
		};
	}, [buis, schijf]);

	// MODEL
	const { nodes, materials } = useGLTF(`${baseUrl}/models/tire-v1.glb`) as any;
	const tireGeometry = useMemo(() => nodes.Circle002.geometry, [nodes]);
	const tireMaterial = useMemo(() => materials["Material.001"], [materials]);
	const rimGeometry = useMemo(() => nodes.Cube002.geometry, [nodes]);
	const rimMaterial = useMemo(() => materials["Material.002"], [materials]);

	return (
		<>
			{/* Linker wiel */}
			<group position-x={frameLength > 3 ? -0.35 : 0}>
				<group
					dispose={null}
					scale={0.15}
					position={[frameLength / 2 - (frameLength / 100) * wheelPositionX, -0.2, frameWidth / 2 + 0.15]}
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

				{/* Rechter wiel */}
				<group
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
			{frameLength > 3 ? (
				<group position-x={0.35}>
					<group
						dispose={null}
						scale={0.15}
						position={[frameLength / 2 - (frameLength / 100) * wheelPositionX, -0.2, frameWidth / 2 + 0.15]}
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

					{/* Rechter wiel */}
					<group
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

useGLTF.preload("./models/tire.glb");
