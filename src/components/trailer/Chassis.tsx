import * as THREE from "three";
import React, { useMemo, useEffect } from "react";
import { useTexture } from "@react-three/drei";
import { shallow } from "zustand/shallow";
import useMeasurements from "../stores/useMeasurements.tsx";
import useButtonState from "../stores/useButtonState.tsx";
import { baseUrl } from "../../global.ts";
import { useSpecialGeometry } from "../hooks/useSpecialGeometry.tsx";

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
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(2, 2.5);
	});

	const stealMatcap = useTexture(`${baseUrl}/matcaps/steal6.4.png`);
	stealMatcap.colorSpace = THREE.SRGBColorSpace;

	/**
	 * MESHES
	 */
	const geometry = useSpecialGeometry(1, 1, 1, 1, 0.03);
	const cylinder = useMemo(() => {
		const geo = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
		return geo;
	}, []);

	/**
	 * SPECIAL GEOMETRIES -----------------------------------------------------------------------------------------------------------------------------------------
	 * ------------------------------------------------------------------------------------------------------------------------------------------------------------
	 */

	//SIDE ---------------------------------------------------------------------------

	const LongBarBottom = useSpecialGeometry(frameLength - 0.06, 0.048, 0.048, 1, 0.003);
	const LongBarTop = useSpecialGeometry(frameLength - 0.01, 0.04, 0.02, 1, 0.003);
	const cornerFront = useSpecialGeometry(plankHeight + 0.55, 0.03, 0.02, 1, 0.003);
	const cornerBack = useSpecialGeometry(plankHeight + 0.1, 0.05, 0.05, 1, 0.003);
	const verticalSideBars = useSpecialGeometry(plankHeight + 0.1, 0.02, 0.02, 1, 0.003);
	
	//MIDDLE ---------------------------------------------------------------------------

	const bottomBars = useSpecialGeometry(frameWidth, 0.05, 0.05, 1, 0.003);
	const bottomBarFront = useSpecialGeometry(frameWidth + 0.1, 0.05, 0.05, 1, 0.003)
	const MiddleBarFront = useSpecialGeometry(frameWidth + 0.065, 0.05, 0.015, 1, 0.003);

	// BACK SIDE ---------------------------------------------------------------------------

	const backSides = useSpecialGeometry(0.05, 0.15, 0.01, 1, 0.003);
	const backTopBottom = useSpecialGeometry(frameWidth + 0.099, 0.01, 0.025, 1, 0.003);
	const backBackBar = useSpecialGeometry(frameWidth + 0.099, 0.15, 0.01, 1, 0);

	// TRIANGLE BARS ---------------------------------------------------------------------------

	const triangleSide = useSpecialGeometry(1.4, 0.08, 0.05, 1, 0.003);
	const triangleMiddle = useSpecialGeometry(0.1, 0.02, 0.12, 1, 0.003);
	
	const triangleMiddleLong = useSpecialGeometry(0.1, 0.02, 0.4, 1, 0.003);

	/**
	 * ------------------------------------------------------------------------------------------------------------------------------------------------------------
	 * ------------------------------------------------------------------------------------------------------------------------------------------------------------
	 */
	const rubber = useMemo(() => {
		const mat = new THREE.MeshStandardMaterial({
			color: "#333333",
			roughness: 0.4,
			metalness: 0,
		});
		return mat;
	}, []);

	// const material = useMemo(() => {
	// 	const mat = new THREE.MeshPhysicalMaterial({
	// 		...metalTexture,
	// 		color: "#cccccc",
	// 		roughness: 0.8,
	// 		metalness: 0.2,
	// 		specularColor: "#ffffff",
	// 		ior: 0.2,
	// 		iridescence: 0.5,
	// 		iridescenceIOR: 1,
	// 		reflectivity: 0.5,
	// 	});
	// 	return mat;
	// }, [metalTexture]);

	const materialUv = useMemo(() => {
		const mat = new THREE.MeshMatcapMaterial({
			... metalTexture,
			color: "#ffffff",
			matcap: stealMatcap,
		});
		return mat;
	}, [metalTexture, stealMatcap]);

	// const materialUv = useMemo(() => {
	// 	const mat = new THREE.MeshPhysicalMaterial({
	// 		... metalTexture,
	// 		color: "#f9f5ff",
	// 		metalness: 0.9,
	// 		roughness: 0.5,
	// 	});
	// 	return mat;
	// }, [metalTexture]);

	/**
	 * UV DEBUG
	 */

	// const uvTexture = useTexture(`${baseUrl}/textures/uv/uv-col.png`, (texture) => {
    //     texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    //     texture.repeat.set(1, 1);
    //     texture.needsUpdate = true;
    // });

	// const materialUv = useMemo(() => {
	// 	const mat = new THREE.MeshStandardMaterial({
	// 		map: uvTexture,
	// 		color: "#f9f5ff",
	// 		metalness: 0.8,
	// 		roughness: 0.4,
	// 	});
	// 	return mat;
	// }, [uvTexture]);


	useEffect(() => {
		return () => {
			cylinder.dispose();
			rubber.dispose();
			materialUv.dispose();
		};
	}, [rubber, cylinder, materialUv]);
	

	return (
		<>
			<group>
				{/* LEFT SIDE */}
				<mesh
					name="bottom"
					castShadow
					receiveShadow
					geometry={LongBarBottom}
					material={materialUv}
					position={[0, 0, frameWidth / 2 + 0.025]}
				/>
				<mesh
					name="top"
					castShadow
					receiveShadow
					geometry={LongBarTop}
					material={materialUv}
					position={[0, plankHeight + 0.1, frameWidth / 2 + 0.02]}
				/>
				{/* LEFT Corners */}
				<mesh
					name="front"
					castShadow
					geometry={cornerFront}
					material={materialUv}
					position={[-(frameLength - 0.02) / 2, (plankHeight + 0.6) / 2, (frameWidth + 0.06) / 2 - 0.01]}
					rotation={[Math.PI * 0.5, Math.PI * 0.5, 0]}
				/>
				<mesh
					name="back"
					geometry={cornerBack}
					material={materialUv}
					position={[(frameLength - 0.05) / 2, (plankHeight + 0.15) / 2, -(frameWidth + 0.05) / 2]}
					rotation={[Math.PI * 0.5, Math.PI * 0.5, 0]}
				/>
				{/* RIGHT SIDE */}
				<mesh
					name="LongBarBottom"
					castShadow
					geometry={LongBarBottom}
					material={materialUv}
					position={[0, 0, -frameWidth / 2 - 0.025]}
				/>
				<mesh
					name="top"
					castShadow
					geometry={LongBarTop}
					material={materialUv}
					position={[0, plankHeight + 0.1, -frameWidth / 2 - 0.03 + 0.01]}
				/>
				{/* RIGHT Corners */}
				<mesh
					name="front"
					castShadow
					geometry={cornerFront}
					material={materialUv}
					position={[-(frameLength - 0.02) / 2, (plankHeight + 0.6) / 2, -(frameWidth + 0.06) / 2 + 0.01]}
					rotation={[Math.PI * 0.5, Math.PI * 0.5, 0]}
				/>
				<mesh
					name="back"
					geometry={cornerBack}
					material={materialUv}
					position={[(frameLength - 0.05) / 2, (plankHeight + 0.15) / 2, (frameWidth + 0.05) / 2]}
					rotation={[Math.PI * 0.5, Math.PI * 0.5, 0]}
				/>
				{/* FRONT SIDE */}
				<mesh
					name="bottom"
					castShadow
					receiveShadow
					geometry={bottomBarFront}
					material={materialUv}
					position={[-(frameLength / 2) + 0.025, 0, 0]}
					rotation={[0, Math.PI / 2, 0]}
				/>
				<mesh
					name="middle"
					castShadow
					receiveShadow
					geometry={MiddleBarFront}
					material={materialUv}
					position={[-(frameLength / 2) + 0.01, plankHeight + 0.1, 0]}
					rotation={[0, Math.PI / 2, 0]}
				/>
				<mesh
					name="top"
					castShadow
					receiveShadow
					geometry={MiddleBarFront}
					material={materialUv}
					position={[-(frameLength / 2) + 0.01, meshSideState ? plankHeight + 0.55 : plankHeight + 0.5, 0]}
					rotation={[0, Math.PI / 2, 0]}
				/>
				{/* BACK SIDE */}
				<mesh
					name="back-side"
					castShadow
					geometry={backBackBar}
					material={materialUv}
					position={[frameLength / 2 - 0.04, -0.05, 0]}
					rotation={[0, Math.PI / 2, 0]}
				/>
				<mesh
					name="top"
					castShadow
					geometry={backTopBottom}
					material={materialUv}
					position={[frameLength / 2 - 0.013, 0.015, 0]}
					rotation={[0, Math.PI / 2, 0]}
					scale={[1, 2, 1]}
				/>
				<mesh
					name="bottom"
					castShadow
					geometry={backTopBottom}
					material={materialUv}
					position={[frameLength / 2 - 0.013, -0.12, 0]}
					rotation={[0, Math.PI / 2, 0]}
					
				/>
				<mesh
					name="left-side"
					castShadow
					geometry={backSides}
					material={materialUv}
					position={[frameLength / 2 - 0.025, -0.05, frameWidth/2 + 0.045]}
				/>
				<mesh
					name="right-side"
					castShadow
					geometry={backSides}
					material={materialUv}
					position={[frameLength / 2 - 0.025, -0.05, - (frameWidth/2 + 0.045)]}
				/>


				{/* STEUN LATTEN */}
				{Array.from({ length: aantalSteunLatten }).map((_, i) => {
					const positionX = startX + i * 0.5;

					return (
						<React.Fragment key={`steunlatten-${i}`}>
							<mesh
								key={`lat-horizontaal-${i}`}
								geometry={bottomBars}
								material={materialUv}
								position={[positionX - 0.05, 0, 0]}
								rotation={[0, Math.PI * 0.5, 0]}
							/>
							<mesh
								key={`lat-verticaal-links-${i}`}
								geometry={verticalSideBars}
								material={materialUv}
								position={[positionX - 0.05, (plankHeight + 0.148) / 2, (frameWidth + 0.1) / 2 - 0.01]}
								rotation={[Math.PI * 0.5, Math.PI * 0.5, 0]}
							/>
							<mesh
								key={`lat-verticaal-links-topje-${i}`}
								geometry={geometry}
								material={rubber}
								position={[positionX - 0.05, plankHeight + 0.124, (frameWidth + 0.1) / 2 - 0.01]}
								rotation={[Math.PI * 0.5, Math.PI * 0.5, 0]}
								scale={[0.005, 0.021, 0.021]}
							/>
							<mesh
								key={`lat-verticaal-rechts-${i}`}
								geometry={verticalSideBars}
								material={materialUv}
								position={[positionX - 0.05, (plankHeight + 0.148) / 2, -(frameWidth + 0.1) / 2 + 0.01]}
								rotation={[Math.PI * 0.5, Math.PI * 0.5, 0]}
							/>
							<mesh
								key={`lat-verticaal-rechts-topje-${i}`}
								geometry={geometry}
								material={rubber}
								position={[positionX - 0.05, plankHeight + 0.124, -((frameWidth + 0.1) / 2 - 0.01)]}
								rotation={[Math.PI * 0.5, Math.PI * 0.5, 0]}
								scale={[0.005, 0.021, 0.021]}
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
					geometry={triangleSide}
					material={materialUv}
					position={[-frameLength / 2 - 0.13, 0, -0.25]}
					rotation-y={Math.PI * 0.115}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={triangleSide}
					material={materialUv}
					position={[-frameLength / 2 - 0.13, 0, 0.25]}
					rotation-y={-Math.PI * 0.115}
				/>
				{/* MIDDLE */}
				<mesh
					castShadow
					receiveShadow
					geometry={triangleMiddle}
					material={materialUv}
					position={[-frameLength / 2 - 0.625, 0.025, 0]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={triangleMiddle}
					material={materialUv}
					scale={[0.2, 1, 2]}
					position={[-frameLength / 2 - 0.48, -0.03, 0]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={triangleMiddleLong}
					material={materialUv}
					position={[-frameLength / 2 - 0.25, 0, 0]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={cylinder}
					material={rubber}
					rotation-z={Math.PI * 0.5}
					scale={[0.01, 1, 0.01]}
					position={[-frameLength / 2, -0.0445, -0.015]}
				/>
			</group>
		</>
	);
}
