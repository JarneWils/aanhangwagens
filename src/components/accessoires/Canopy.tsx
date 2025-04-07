import { shallow } from "zustand/shallow";
import useButtonState from "../stores/useButtonState";
import useMeasurements from "../stores/useMeasurements";
import * as THREE from "three";
import { useEffect, useMemo } from "react";
import { useTexture, RoundedBox } from "@react-three/drei";
import { baseUrl } from "../../global";

export default function Canopy() {

	/**
	 * STORE
	 */
	const { canopy, } = useButtonState(
		(state) => ({
			canopy: state.canopy,
		}),
		shallow
	);
	const { frameLength, frameWidth, plankHeight } = useMeasurements(
		(state) => ({
			frameLength: state.frameLength,
			frameWidth: state.frameWidth,
			plankHeight: state.plankHeight,
		}),
		shallow
	);


	/**
	 * TEXTURES
	 */
	const leatherTexture = useTexture({
		map: `${baseUrl}/textures/canopy/fabric_leather_02_diff_4k_8.0.jpg`,
		normalMap: `${baseUrl}/textures/canopy/fabric_leather_02_norm_4k_4.0.jpg`,
		roughnessMap: `${baseUrl}/textures/metal2.0/concrete_floor_02_rough_4k.jpg`,
		aoMap: `${baseUrl}/textures/metal/concrete_floor_worn_001_ao_4k.jpg`,
	});
	Object.values(leatherTexture).forEach((texture) => {
		texture.wrapS = THREE.MirroredRepeatWrapping;
		texture.wrapT = THREE.MirroredRepeatWrapping;
		texture.repeat.set(0.6, 0.6);
	});

	const cuttonTexture = useTexture({
		map: `${baseUrl}/textures/cutton/dirty_carpet_diff_4k.jpg`,
	});
	Object.values(cuttonTexture).forEach((texture) => {
		texture.wrapS = THREE.MirroredRepeatWrapping;
		texture.wrapT = THREE.MirroredRepeatWrapping;
		texture.repeat.set(0.2, 10.8);
	});


	/**
	 * GEOMETRIES
	 */
	const zipperBarGeometry = useMemo(() => {
		const geo = new THREE.CylinderGeometry(0.005, 0.005, 0.015, 8);
		return geo;
	}, []);

	const zipperCuttonGeometry = useMemo(() => {
		const geo = new THREE.BoxGeometry(0.015, 0.95, 0.045);
		return geo;
	}, []);

	const ringGeometry = useMemo(() => {
		const geo = new THREE.RingGeometry(0.01, 0.02, 424);
		return geo;
	}, []);

	const robeGeometry =  new THREE.CylinderGeometry(0.008, 0.004, plankHeight + 0.1);


	/**
	 * MATERIALS
	 */
	const leatherMaterial = useMemo(() => {
		const mat = new THREE.MeshStandardMaterial({
			...leatherTexture,
			color: "#9a9a9a",
			roughness: 1,
			metalness: 0.2,
			side: THREE.DoubleSide,
		});
		return mat;
	}, []);

	const zipperBarMaterial = useMemo(() => {
		const mat = new THREE.MeshStandardMaterial({
			color: "#777777",
			roughness: 0.4,
			metalness: 0.2,
			side: THREE.DoubleSide,
		});
		return mat;
	}, []);

	const zipperCuttonMaterial = useMemo(() => {
		const mat = new THREE.MeshStandardMaterial({
			...cuttonTexture,
			roughness: 0,
		});
		return mat;
	}, []);

	const robeMaterial = useMemo(() => {
		const mat = new THREE.MeshStandardMaterial({
			color: "#444444",
			roughness: 0.4,
			metalness: 0.1,
		});
		return mat;
	}, []);


	useEffect(() => {
		return () => {
			zipperBarGeometry.dispose();
			zipperBarMaterial.dispose();
			zipperCuttonGeometry.dispose();
			zipperCuttonMaterial.dispose();
			leatherMaterial.dispose();
			ringGeometry.dispose();
			robeMaterial.dispose();
		};
	}, [zipperBarGeometry, zipperBarMaterial, zipperCuttonGeometry, zipperCuttonMaterial, leatherMaterial, ringGeometry, robeMaterial]);

	/**
	 * SCRIPT
	 */
	const zipperSpace = 0.0195;

	const groupCount = Math.floor(frameLength / 0.55);
	const groupSpacing = 0.5;
		

	const canopyGeometry = useMemo(() => {
		// Hier gebruiken we geen BoxGeometry meer, maar RoundedBox
		return (
			<group visible={canopy ? true : false}>
				<RoundedBox
					args={[frameLength +0.1, 1, frameWidth + 0.125]} // Afmetingen
					radius={0.02} // Straal van de afgeronde hoeken
					position={[0, 0.5 + plankHeight, 0]}
					receiveShadow
					castShadow
				>
					<meshStandardMaterial
						{...leatherTexture}
						color="#acacab"
						roughness={1}
						metalness={0.2}
						side={THREE.DoubleSide}
					/>
				</RoundedBox>
				{/* zippers BACK */}
				<group>
					<group
					name="zipper 1"
					position={[0, 0.01, frameWidth / 2 - 0.1]}>
						<mesh
						name="zipper cutton"
						geometry={zipperCuttonGeometry}
						material={zipperCuttonMaterial}
						position={[frameLength / 2 + 0.048, plankHeight + 0.49, 0]}
						/>
						<mesh
						name="zipper cutton"
						geometry={zipperCuttonGeometry}
						material={leatherMaterial}
						position={[frameLength / 2 + 0.05, plankHeight + 0.49, 0.03]}
						rotation={[0, - Math.PI * 0.1, Math.PI * 0.0025]}
						/>
						{Array.from({ length: 48 }).map((_, i) => (
							<mesh
								key={i}
								geometry={zipperBarGeometry}
								material={zipperBarMaterial}
								position={[frameLength / 2 + 0.052, plankHeight + 0.01 + i * zipperSpace, -0.0025]}
								rotation={[Math.PI / 2, 0, 0]}
							/>
							))}
						{Array.from({ length: 48 }).map((_, i) => (
							<mesh
								key={i}
								geometry={zipperBarGeometry}
								material={zipperBarMaterial}
								position={[frameLength / 2 + 0.052, plankHeight + 0.02 + i * zipperSpace, 0.0025]}
								rotation={[Math.PI / 2, 0, 0]}
							/>
							))}
					</group>

					<group
					name="zipper 2"
					position={[0, 0.01, - (frameWidth / 2 - 0.1)]}>
						<mesh
						name="zipper cutton"
						geometry={zipperCuttonGeometry}
						material={zipperCuttonMaterial}
						position={[frameLength / 2 + 0.048, plankHeight + 0.49, 0]}
						/>
						<mesh
						name="zipper cutton"
						geometry={zipperCuttonGeometry}
						material={leatherMaterial}
						position={[frameLength / 2 + 0.05, plankHeight + 0.49, -0.03]}
						rotation={[0, Math.PI * 0.1, Math.PI * 0.0025]}
						/>
						{Array.from({ length: 48 }).map((_, i) => (
							<mesh
								key={i}
								geometry={zipperBarGeometry}
								material={zipperBarMaterial}
								position={[frameLength / 2 + 0.052, plankHeight + 0.01 + i * zipperSpace, -0.0025]}
								rotation={[Math.PI / 2, 0, 0]}
							/>
							))}
						{Array.from({ length: 48 }).map((_, i) => (
							<mesh
								key={i}
								geometry={zipperBarGeometry}
								material={zipperBarMaterial}
								position={[frameLength / 2 + 0.052, plankHeight + 0.02 + i * zipperSpace, 0.0025]}
								rotation={[Math.PI / 2, 0, 0]}
							/>
							))}
					</group>
				</group>

				{/* zippers Front */}
				<group rotation={[0, Math.PI, 0]}>
					<group
					name="zipper 1"
					position={[0, 0.01, frameWidth / 2 - 0.1]}>
						<mesh
						name="zipper cutton"
						geometry={zipperCuttonGeometry}
						material={zipperCuttonMaterial}
						position={[frameLength / 2 + 0.048, plankHeight + 0.49, 0]}
						/>
						<mesh
						name="zipper flap"
						geometry={zipperCuttonGeometry}
						material={leatherMaterial}
						position={[frameLength / 2 + 0.05, plankHeight + 0.49, 0.03]}
						rotation={[0, - Math.PI * 0.1, Math.PI * 0.0025]}
						/>
						{Array.from({ length: 48 }).map((_, i) => (
							<mesh
								key={i}
								geometry={zipperBarGeometry}
								material={zipperBarMaterial}
								position={[frameLength / 2 + 0.052, plankHeight + 0.01 + i * zipperSpace, -0.0025]}
								rotation={[Math.PI / 2, 0, 0]}
							/>
							))}
						{Array.from({ length: 48 }).map((_, i) => (
							<mesh
								key={i}
								geometry={zipperBarGeometry}
								material={zipperBarMaterial}
								position={[frameLength / 2 + 0.052, plankHeight + 0.02 + i * zipperSpace, 0.0025]}
								rotation={[Math.PI / 2, 0, 0]}
							/>
							))}
					</group>

					<group
					name="zipper 2"
					position={[0, 0.01, - (frameWidth / 2 - 0.1)]}>
						<mesh
						name="zipper cutton"
						geometry={zipperCuttonGeometry}
						material={zipperCuttonMaterial}
						position={[frameLength / 2 + 0.048, plankHeight + 0.49, 0]}
						/>
						<mesh
						name="zipper flap"
						geometry={zipperCuttonGeometry}
						material={leatherMaterial}
						position={[frameLength / 2 + 0.05, plankHeight + 0.49, -0.03]}
						rotation={[0, Math.PI * 0.1, Math.PI * 0.0025]}
						/>
						{Array.from({ length: 48 }).map((_, i) => (
							<mesh
								key={i}
								geometry={zipperBarGeometry}
								material={zipperBarMaterial}
								position={[frameLength / 2 + 0.052, plankHeight + 0.01 + i * zipperSpace, -0.0025]}
								rotation={[Math.PI / 2, 0, 0]}
							/>
							))}
						{Array.from({ length: 48 }).map((_, i) => (
							<mesh
								key={i}
								geometry={zipperBarGeometry}
								material={zipperBarMaterial}
								position={[frameLength / 2 + 0.052, plankHeight + 0.02 + i * zipperSpace, 0.0025]}
								rotation={[Math.PI / 2, 0, 0]}
							/>
							))}
					</group>
				</group>

				{Array.from({ length: groupCount }).map((_, i) => (
					<group key={i} position={[i * groupSpacing - frameLength / 2 + 0.45, 0.01, -0.01]}>
						<mesh
						name="ring"
						geometry={ringGeometry}
						material={zipperBarMaterial}
						position={[0, plankHeight + 0.05, frameWidth / 2 + 0.08]}
						/>
						<mesh
						name="robe"
						geometry={robeGeometry}
						material={robeMaterial}
						position={[-plankHeight / 2.765, plankHeight / 1.65, frameWidth / 2 + 0.055]}
						rotation={[0, -Math.PI * 0.05, -Math.PI * 0.2]}
						/>
						<mesh
						name="robe"
						geometry={robeGeometry}
						material={robeMaterial}
						position={[plankHeight / 2.765, plankHeight / 1.65, frameWidth / 2 + 0.055]}
						rotation={[0, Math.PI * 0.05, Math.PI * 0.2]}
						/>
					</group>
				))}
				{Array.from({ length: groupCount }).map((_, i) => (
					<group key={i} position={[i * groupSpacing - frameLength / 2 + 0.45, 0.01, 0.01]}>
						<mesh
						name="ring"
						geometry={ringGeometry}
						material={zipperBarMaterial}
						position={[0, plankHeight + 0.05, -(frameWidth / 2 + 0.08)]}
						/>
						<mesh
						name="robe"
						geometry={robeGeometry}
						material={robeMaterial}
						position={[-plankHeight / 2.765, plankHeight / 1.65, -(frameWidth / 2 + 0.055)]}
						rotation={[0, Math.PI * 0.05, -Math.PI * 0.2]}
						/>
						<mesh
						name="robe"
						geometry={robeGeometry}
						material={robeMaterial}
						position={[plankHeight / 2.765, plankHeight / 1.65, -(frameWidth / 2 + 0.055)]}
						rotation={[0, -Math.PI * 0.05, Math.PI * 0.2]}
						/>
					</group>
				))}
			</group>
		);
	}, [frameLength, frameWidth, plankHeight, leatherTexture, canopy]);

	return <>{canopyGeometry}</>;
}
