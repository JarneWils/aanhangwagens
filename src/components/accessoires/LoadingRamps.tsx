import { useTexture } from "@react-three/drei";
import useButtonState from "../stores/useButtonState";
import { baseUrl } from "../../global";
import * as THREE from "three";
import { shallow } from "zustand/shallow";
import { useEffect, useMemo } from "react";
import useMeasurements from "../stores/useMeasurements";

export default function LoadingRamps() {

	/**
	 * STORES
	 */
	const { loadingRamps } = useButtonState(
		(state) => ({
			loadingRamps: state.loadingRamps,
		}),
		shallow
	);
	const {frameLength, frameWidth} = useMeasurements(
		(state) => ({
			frameLength: state.frameLength,
			frameWidth: state.frameWidth,
		}),
		shallow
	);

	/**
	 * TEXTURES
	 */
	const repeatCount = 1.5;
	const antislipMetalTexture = useTexture({
		map: `${baseUrl}/textures/AntiSlipMetal/antislip-diff.jpg`,
		normalMap: `${baseUrl}/textures/AntiSlipMetal/antislipMetal-norm.jpg`,
	});
	Object.values(antislipMetalTexture).forEach((texture) => {
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(1/repeatCount, 1/repeatCount);
	});
	const antislipMetalTexture2 = useMemo(() => {
		const clonedTextures = Object.fromEntries(
			Object.entries(antislipMetalTexture).map(([key, tex]) => [key, tex.clone()])
		);
		Object.values(clonedTextures).forEach((texture) => {
			texture.wrapS = THREE.RepeatWrapping;
			texture.wrapT = THREE.RepeatWrapping;
			texture.repeat.set(4/repeatCount, 1/repeatCount);
		});
		return clonedTextures;
	}, [antislipMetalTexture]);

	/**
	 * MATERIALS
	 */
	const antislipMetal = useMemo(() => {
		const mat = new THREE.MeshStandardMaterial({
			... antislipMetalTexture,
			color: "#c5c5cd",
			metalness: 0.5,
			roughness: 0.8,
		})
		return mat;
	}, [antislipMetalTexture]);

	const antislipMetal2 = useMemo(() => {
		const mat = new THREE.MeshStandardMaterial({
			... antislipMetalTexture2,
			color: "#c5c5cd",
			metalness: 0.2,
			roughness: 0.2,
		})
		return mat;
	}, [antislipMetalTexture2]);

	/**
	 * GEOMETRIES
	 */
	const loadingRampsGeometry = useMemo(() => {
		const geometry = new THREE.BoxGeometry(1.5, 0.02, 0.3);
		return geometry;
	}, []);
	const loadingFlatPartGeometry = useMemo(() => {
		const geometry = new THREE.BoxGeometry(0.3, 0.02, 0.3);
		return geometry;
	}, []);

	/**
	 * SCRIPTS
	 */
	//dispose
	useEffect(() => {
		return () => {
			antislipMetal.dispose();
			loadingRampsGeometry.dispose();
			antislipMetal2.dispose();
			loadingFlatPartGeometry.dispose();
		}
	}, [antislipMetal, loadingRampsGeometry, antislipMetal2, loadingFlatPartGeometry]);

	return (
		<group visible={loadingRamps}>
			<group
			name="left-side">
				<mesh
					name="loadingRampLeft"
					castShadow
					geometry={loadingRampsGeometry}
					material={antislipMetal2}
					position={[frameLength / 2 + 0.7, -0.215, frameWidth / 2 - 0.35]}
					rotation={[0, 0, -Math.PI * 0.115]}
				/>
				<mesh
					name="flat-part-Left"
					castShadow
					geometry={loadingFlatPartGeometry}
					material={antislipMetal}
					position={[frameLength / 2 - 0.148, 0.0495, frameWidth / 2 - 0.35]}
				/>
			</group>
			<group
			name="right-side">
				<mesh
					name="loadingRampLeft"
					castShadow
					geometry={loadingRampsGeometry}
					material={antislipMetal2}
					position={[frameLength / 2 + 0.7, -0.215, - (frameWidth / 2 - 0.35)]}
					rotation={[0, 0, -Math.PI * 0.115]}
				/>
				<mesh
					name="flat-part-Left"
					castShadow
					geometry={loadingFlatPartGeometry}
					material={antislipMetal}
					position={[frameLength / 2 - 0.148, 0.0495, - (frameWidth / 2 - 0.35)]}
				/>
			</group>
		</group>
	);
}
