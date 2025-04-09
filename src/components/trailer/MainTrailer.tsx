// COMPONENTS
import Chassis from "./Chassis.tsx";
import Wheels from "./Wheels.tsx";
import TrailerBed from "./TrailerBed.tsx";
import Spatboard from "./Spatboard.tsx";
import Tailgate from "./Tailgate.tsx";
import TrailerNose from "./TrailerNose.tsx";
import MeshSides from "../accessoires/MeshSides.tsx";

// STORES
import Details from "./Details.tsx";
import { BrightnessContrast, EffectComposer, N8AO, ToneMapping } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import Canopy from "../accessoires/Canopy.tsx";
import LoadingRamps from "../accessoires/LoadingRamps.tsx";
// import useButtonState from "../stores/useButtonState.tsx";
// import { shallow } from "zustand/shallow";
import { useTexture } from "@react-three/drei";
import { baseUrl } from "../../global.ts";
import * as THREE from "three";

export default function MainTrailer() {
	
	// const {screenShot} = useButtonState(
	// 	(state) => ({
	// 		darkMode: state.darkMode,
	// 		screenShot: state.screenShot,
	// 	}),
	// 	shallow
	// );

	// GRASS TEXTURE
	const grassTexture = useTexture({
		map: `${baseUrl}/textures/grass/Grass004_1K-JPG_Color.jpg`,
		normalMap: `${baseUrl}/textures/grass/Grass004_1K-JPG_NormalGL.jpg`,
		aoMap: `${baseUrl}/textures/grass/Grass004_1K-JPG_AmbientOcclusion.jpg`,
	});
	// repeat
	Object.values(grassTexture).forEach((texture) => {
		texture.wrapS = THREE.MirroredRepeatWrapping;
		texture.wrapT = THREE.MirroredRepeatWrapping;
		texture.repeat.set(25, 25);
	});

	return (
		<>
			<EffectComposer multisampling={8}>
				<N8AO aoRadius={10} distanceFalloff={0.2} intensity={4} screenSpaceRadius renderMode={0} />
				<ToneMapping mode={ToneMappingMode.NEUTRAL} />
				<BrightnessContrast contrast={0.12} brightness={-0.01} />
			</EffectComposer>
			{/* TRAILER BASIC */}
			<Chassis />
			<TrailerNose />
			<Wheels />
			<Spatboard />
			<TrailerBed />
			<Tailgate />
			{/* DETAILS */}
			<Details />
			{/* TRAILER ACCESSOIRES */}
			<MeshSides />
			{/* CANOPY */}
			<Canopy />
			{/* LOADING RAMPS */}
			<LoadingRamps />

			{/*Grass*/}
			{/* <group visible={screenShot}>
				<mesh position-y={-0.48} rotation-x={-Math.PI * 0.5} scale={100} receiveShadow>
					<planeGeometry />
					<meshStandardMaterial map={grassTexture.map} normalMap={grassTexture.normalMap} opacity={0.25} />
				</mesh>
			</group> */}

		</>
	);
}
