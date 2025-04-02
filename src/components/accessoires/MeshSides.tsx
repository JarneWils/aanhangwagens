import useMeasurements from "../stores/useMeasurements";
import useButtonState from "../stores/useButtonState";
import { useTexture } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import React from "react";
import { baseUrl } from "../../global";

export default function MeshSides() {
	// MEASUREMENTS
	const frameLength = useMeasurements((state: { frameLength: number }) => state.frameLength);
	const frameWidth = useMeasurements((state: { frameWidth: number }) => state.frameWidth);
	const plankHeight = useMeasurements((state: { plankHeight: number }) => state.plankHeight);

	const meshSideState = useButtonState((state) => state.meshSideState);

	// TEXTURES
	// const rasterTexture = useTexture({
	// 	map: "public/textures/metal2.0/raster-texture1.png",
	// });
	// Object.values(rasterTexture).forEach((texture) => {
	// 	texture.wrapS = THREE.RepeatWrapping;
	// 	texture.wrapT = THREE.RepeatWrapping;
	// 	texture.repeat.set(frameLength * 5, 2.5);
	// });

	const rasterTexture = useTexture({
		map: `${baseUrl}/textures/metal2.0/raster-texture.png`,
		normalMap: `${baseUrl}/textures/metal2.0/raster-texture-normal.png`,
	});
	const { gl } = useThree();
	rasterTexture.map.anisotropy = gl.capabilities.getMaxAnisotropy();
	Object.values(rasterTexture).forEach((texture) => {
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(frameLength * 5, 2.5);
	});

	const metalTexture = useTexture({
		map: `${baseUrl}/textures/metal2.0/concrete_floor_02_diff_4k_2.0.jpg`,
		normalMap: `${baseUrl}/textures/metal/concrete_floor_worn_001_nor_gl_4k.jpg`,
		roughnessMap: `${baseUrl}/textures/metal/concrete_floor_worn_001_rough_4k.jpg`,
		aoMap: `${baseUrl}/textures/metal/concrete_floor_worn_001_ao_4k.jpg`,
	});

	Object.values(metalTexture).forEach((texture) => {
		texture.wrapS = THREE.MirroredRepeatWrapping;
		texture.wrapT = THREE.MirroredRepeatWrapping;
		texture.repeat.set(2, 0.2);
	});

	// MATERIALS
	const raster = useMemo(() => {
		const mat = new THREE.MeshStandardMaterial({
			...rasterTexture,
			color: "#cccccc",
			transparent: true,
			roughness: 0.4,
			metalness: 0,
		});
		return mat;
	}, [rasterTexture]);

	const raster2 = useMemo(() => {
		const mat = new THREE.MeshStandardMaterial({
			color: "#999999",
			roughness: 0.6,
			metalness: 0.5,
		});
		return mat;
	}, []);

	const metal = useMemo(() => {
		const mat = new THREE.MeshStandardMaterial({
			...metalTexture,
			color: "#FFFFFF",
			roughness: 0.4,
			metalness: 0.4,
		});
		return mat;
	}, [metalTexture]);

	// GEOMETRIES
	const square = useMemo(() => {
		const geo = new THREE.BoxGeometry();
		return geo;
	}, []);

	const cylinder = useMemo(() => {
		const geo = new THREE.CylinderGeometry();
		return geo;
	}, []);

	useEffect(() => {
		return () => {
			raster.dispose();
			raster2.dispose();
			metal.dispose();
			square.dispose();
			cylinder.dispose();
		};
	}, [raster, metal, square, cylinder, raster2]);

	const aantalCilindersV = Math.floor(frameLength * 14);
	const startX = -frameLength / 2 + 0.07;
	const aantalCilindersH = 6;
	const startY = plankHeight;

	const aantalCilindersZV = Math.floor(frameWidth * 14);
	const startZ = -(frameWidth / 2 + 0.07);
	const aantalCilindersZH = 6;

	return (
		<>
			<group visible={meshSideState}>
				{/* <mesh
					castShadow
					receiveShadow
					name="left-raster"
					geometry={square}
					material={raster}
					scale={[frameLength - 0.02, 0.48, 0.005]}
					position={[0, plankHeight + 0.325, frameWidth / 2 + 0.03]}
				/>
				<mesh
					castShadow
					receiveShadow
					name="right-raster"
					geometry={square}
					material={raster}
					scale={[frameLength - 0.02, 0.48, 0.005]}
					position={[0, plankHeight + 0.325, -(frameWidth / 2 + 0.03)]}
				/>
				<mesh
					castShadow
					receiveShadow
					name="front-raster"
					geometry={square}
					material={raster}
					scale={[frameWidth + 0.02, 0.48, 0.005]}
					rotation={[0, Math.PI * 0.5, 0]}
					position={[-(frameLength / 2) + 0.01, plankHeight + 0.325, 0]}
				/> */}
				<mesh
					castShadow
					name="left-bar-horizontal"
					geometry={square}
					material={metal}
					scale={[frameLength - 0.01, 0.05, 0.02]}
					position={[0 + 0.005, plankHeight + 0.55, frameWidth / 2 + 0.03]}
				/>
				<mesh
					castShadow
					name="left-bar-vertical"
					geometry={square}
					material={metal}
					scale={[0.4, 0.05, 0.02]}
					position={[frameLength / 2 - 0.025, plankHeight + 0.325, frameWidth / 2 + 0.03]}
					rotation-z={Math.PI * 0.5}
				/>
				<mesh
					castShadow
					name="right-bar-horizontal"
					geometry={square}
					material={metal}
					scale={[frameLength - 0.01, 0.05, 0.02]}
					position={[0 + 0.005, plankHeight + 0.55, -(frameWidth / 2 + 0.03)]}
				/>
				<mesh
					castShadow
					name="right-bar-vertical"
					geometry={square}
					material={metal}
					scale={[0.4, 0.05, 0.02]}
					position={[frameLength / 2 - 0.025, plankHeight + 0.325, -(frameWidth / 2 + 0.03)]}
					rotation-z={Math.PI * 0.5}
				/>
				<group>
					{Array.from({ length: aantalCilindersV }).map((_, i) => {
						const positionX = startX + i * 0.07;
						return (
							<React.Fragment key={`raster-latten-${i}`}>
								<mesh
									castShadow
									name={`raster-V-L${i}`}
									geometry={cylinder}
									material={raster2}
									scale={[0.004, 0.45, 0.004]}
									position={[positionX, plankHeight + 0.325, frameWidth / 2 + 0.03]}
								/>
								<mesh
									castShadow
									name={`raster-V-R${i}`}
									geometry={cylinder}
									material={raster2}
									scale={[0.004, 0.45, 0.004]}
									position={[positionX, plankHeight + 0.325, -(frameWidth / 2 + 0.03)]}
								/>
							</React.Fragment>
						);
					})}
					;
					{Array.from({ length: aantalCilindersH }).map((_, i) => {
						const positionY = startY + i * 0.07;
						return (
							<React.Fragment key={`raster-latten-${i}`}>
								<mesh
									castShadow
									name={`raster-H-L${i}`}
									geometry={cylinder}
									material={raster2}
									scale={[0.004, frameLength - 0.01, 0.004]}
									rotation-z={Math.PI * 0.5}
									position={[0, positionY + 0.15, frameWidth / 2 + 0.03]}
								/>
								<mesh
									castShadow
									name={`raster-H-R${i}`}
									geometry={cylinder}
									material={raster2}
									scale={[0.004, frameLength - 0.01, 0.004]}
									rotation-z={Math.PI * 0.5}
									position={[0, positionY + 0.15, -(frameWidth / 2 + 0.03)]}
								/>
							</React.Fragment>
						);
					})}
					;
					{Array.from({ length: aantalCilindersZV }).map((_, i) => {
						const positionZH = startZ + i * 0.07;
						return (
							<React.Fragment key={`raster-latten-${i}`}>
								<mesh
									castShadow
									name={`raster-V-${i}`}
									geometry={cylinder}
									material={raster2}
									scale={[0.004, 0.42, 0.004]}
									rotation-y={Math.PI * 0.5}
									position={[-(frameLength / 2 - 0.01), plankHeight + 0.325, positionZH + 0.15]}
								/>
							</React.Fragment>
						);
					})}
					{Array.from({ length: aantalCilindersZH }).map((_, i) => {
						const positionY = startY + i * 0.07;
						return (
							<React.Fragment key={`raster-latten-${i}`}>
								<mesh
									castShadow
									name={`raster-H-R${i}`}
									geometry={cylinder}
									material={raster2}
									scale={[0.004, 0.004, frameWidth / 2 + 0.02]}
									position={[-(frameLength / 2 - 0.01), positionY + 0.15, 0]}
								/>
							</React.Fragment>
						);
					})}
					;
				</group>
			</group>
		</>
	);
}
