import * as THREE from "three";
import { useMemo, useEffect, useState, useRef } from "react";
import { useCursor, useTexture } from "@react-three/drei";

import useMeasurements from "../stores/useMeasurements";
import { shallow } from "zustand/shallow";
import { baseUrl } from "../../global";
import useMaterialState from "../stores/useMaterialState";
import useButtonState from "../stores/useButtonState";
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { useSpecialGeometry } from "../hooks/useSpecialGeometry";

export default function TrailerBed() {
	/**
	 * STORES
	 */
	const { plankHeight, frameLength, frameWidth } = useMeasurements(
		(state) => ({
			plankHeight: state.plankHeight,
			frameLength: state.frameLength,
			frameWidth: state.frameWidth,
		}),
		shallow
	);
	const { plankMaterialWoodLight, plankMaterialWoodDark, plankMaterialMetal } = useMaterialState(
		(state) => ({
			plankMaterialWoodLight: state.plankMaterialWoodLight,
			plankMaterialWoodDark: state.plankMaterialWoodDark,
			plankMaterialMetal: state.plankMaterialMetal,
		}),
		shallow
	);
	const { gateOpen, setGateOpen, loadingRamps } = useButtonState(
		(state) => ({
			gateOpen: state.gateOpen,
			setGateOpen: state.setGateOpen,
			loadingRamps: state.loadingRamps,
		}),
		shallow
	);
	/**
	 * TEXTURES
	 */

	//wood texture
	const woodTexture = useTexture({
		map: `${baseUrl}/textures/wood/fine_grained_wood_col_4k8.0.jpg`,
		normalMap: `${baseUrl}/textures/wood/fine_grained_wood_nor_gl_4k.jpg`,
		roughnessMap: `${baseUrl}/textures/wood/fine_grained_wood_rough_4k.jpg`,
		aoMap: `${baseUrl}/textures/wood/fine_grained_wood_ao_4k.jpg`,
	});
	Object.values(woodTexture).forEach((texture) => {
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(2, 2);
	});

	//metal texture
	const metalTexture = useTexture({
		map: `${baseUrl}/textures/metal2.0/concrete_floor_02_ao_4k.jpg`,
		normalMap: `${baseUrl}/textures/metal/concrete_floor_worn_001_nor_gl_4k.jpg`,
		roughnessMap: `${baseUrl}/textures/metal2.0/concrete_floor_02_rough_4k.jpg`,
		aoMap: `${baseUrl}/textures/metal/concrete_floor_worn_001_ao_4k.jpg`,
	});
	Object.values(metalTexture).forEach((texture) => {
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(3, 3);
	});
	const stealMatcap = useTexture(`${baseUrl}/matcaps/steal6.6.png`);
	stealMatcap.colorSpace = THREE.SRGBColorSpace;
	
	const woodMatcap = useTexture(`${baseUrl}/matcaps/wood5.png`);
	woodMatcap.colorSpace = THREE.SRGBColorSpace
	
	const woodMatcapDark = useTexture(`${baseUrl}/matcaps/wood5.png`);
	woodMatcapDark.colorSpace = THREE.SRGBColorSpace

	/**
	 * MATERIALS
	 */
	const lightWoodMaterial = useMemo(() => {
		const mat = new THREE.MeshStandardMaterial({
			map: woodTexture.map,
			normalMap: woodTexture.normalMap,
			roughnessMap: woodTexture.roughnessMap,
			// aoMap: woodTexture.aoMap,
			color: "#9C8B86",
			roughness: 0.9,
			metalness: 0.4,
		});
		return mat;
	}, [woodTexture]);
	// const lightWoodMaterial = useMemo(() => {
	// 	const mat = new THREE.MeshMatcapMaterial({
	// 		... woodTexture,
	// 		// color: "#EFD9D2",
	// 		matcap: woodMatcap,
	// 	});
	// 	return mat;
	// }, [woodMatcap, woodTexture]);

	const darkWoodMaterial = useMemo(() => {
		const mat = new THREE.MeshStandardMaterial({
			map: woodTexture.map,
			normalMap: woodTexture.normalMap,
			roughnessMap: woodTexture.roughnessMap,
			aoMap: woodTexture.aoMap,
			color: "#7D7D7D",
			roughness: 0.8,
			metalness: 0.3,
		});
		return mat;
	}, [woodTexture]);

	// const darkWoodMaterial = useMemo(() => {
	// 	const mat = new THREE.MeshMatcapMaterial({
	// 		... woodTexture,
	// 		color: "#ccbec2",
	// 		matcap: woodMatcapDark,
	// 	});
	// 	return mat;
	// }, [woodMatcapDark, woodTexture]);

	// const metalMaterial = useMemo(() => {
	// 	const mat = new THREE.MeshStandardMaterial({
	// 		map: metalTexture.map,
	// 		normalMap: metalTexture.normalMap,
	// 		roughnessMap: metalTexture.roughnessMap,
	// 		aoMap: metalTexture.aoMap,
	// 		color: "#cccccc",
	// 		roughness: 0.5,
	// 		metalness: 0.9,
	// 	});
	// 	return mat;
	// }, [metalTexture]);

	const metalMaterial = useMemo(() => {
		const mat = new THREE.MeshMatcapMaterial({
			... metalTexture,
			color: "#d9d9dd",
			matcap: stealMatcap,
		});
		return mat;
	}, [stealMatcap, metalTexture]);

	console.log(plankMaterialWoodLight)

	let plankMaterial = lightWoodMaterial;
	if(plankMaterialWoodDark === true){plankMaterial = darkWoodMaterial}
	if(plankMaterialWoodLight === true){plankMaterial = lightWoodMaterial}
	if(plankMaterialMetal === true){plankMaterial = metalMaterial}


	/**
	 * MESHES
	 */
	const plank = useMemo(() => {
		const geo = new RoundedBoxGeometry(1, 1, 1, 1, 0.02);
		return geo;
	}, []);

	const plankBottom = useSpecialGeometry(frameLength - 0.04, 0.02, frameWidth + 0.04, 8, 0);

	const plankSide = useSpecialGeometry(frameLength - 0.01, plankHeight, 0.02, 8, 0.001);

	const plankFront = useSpecialGeometry(frameWidth + 0.04, plankHeight, 0.02, 8, 0.001);

	const plankBack = useSpecialGeometry(frameWidth - 0.01, plankHeight - 0.01, 0.02, 8, 0.001);

	/**
	 * SCRIPTS
	 */
	const backSideRef = useRef<THREE.Mesh>(null);

	const [hovered, setHovered] = useState(false);

	useCursor(hovered);

	const handleClickGate = () => {
		if(!gateOpen){
			setGateOpen(true)
		} else if (gateOpen && loadingRamps === false){
			setGateOpen(false)
		}
	};

	
	const hoverMaterial = useMemo(() => {
		const mat = new THREE.MeshStandardMaterial({
			color: "#ff612f",
			roughness: 1,
			metalness: 0.2,
			opacity: hovered ? 0.4 : 0,
			transparent: true,
		});
		return mat;
	}, [hovered]);

	useEffect(() => {
		return () => {
			plank.dispose();
			plankBottom.dispose();
			plankMaterial.dispose();
			hoverMaterial.dispose();
		};
	}, [plank, plankBottom, plankMaterial, hoverMaterial]);

	return (
		<>
			<mesh
				name="left-side"
				castShadow
				geometry={plankSide}
				material={plankMaterial}
				position={[0, (plankHeight + 0.05) / 2, frameWidth / 2 + 0.02]}
			/>
			<mesh
				name="right-side"
				castShadow
				geometry={plankSide}
				material={plankMaterial}
				position={[0, (plankHeight + 0.05) / 2, -(frameWidth / 2) - 0.02]}
			/>
			<mesh
				name="front-side"
				castShadow
				geometry={plankFront}
				material={plankMaterial}
				rotation-y={Math.PI * 0.5}
				position={[-(frameLength / 2) + 0.02, (plankHeight + 0.05) / 2, 0]}
			/>
			<mesh
				name="back-side"
				ref={backSideRef}
				onPointerOver={() => setHovered(true)}
				onPointerOut={() => setHovered(false)}
				onClick={handleClickGate} 
				castShadow
				geometry={plankBack}
				material={plankMaterial}
				rotation-y={Math.PI * 0.5}
				position={[
					gateOpen ? (frameLength / 2 + 0.03) : (frameLength / 2 - 0.01),
					gateOpen ? - ((plankHeight + 0.03) / 2 + 0.01) : (plankHeight + 0.03) / 2 + 0.01,
					0
				]}
			/>
			<mesh
				name="back-side-hover"
				ref={backSideRef}
				onClick={handleClickGate} 
				castShadow
				geometry={plankBack}
				material={hoverMaterial}
				rotation-y={Math.PI * 0.5}
				position={[
					gateOpen ? (frameLength / 2 + 0.03) : (frameLength / 2 - 0.01),
					gateOpen ? - ((plankHeight + 0.03) / 2 + 0.01) : (plankHeight + 0.03) / 2 + 0.01,
					0
				]}
			/>
			<mesh
				name="bottom"
				castShadow
				receiveShadow
				geometry={plankBottom}
				material={plankMaterial}
				position={[0, 0.035, 0]}
			/>
		</>
	);
}
