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
import Canopy from "../accessoires/Canopy.tsx";
import LoadingRamps from "../accessoires/LoadingRamps.tsx";
// import useButtonState from "../stores/useButtonState.tsx";
// import { shallow } from "zustand/shallow";
import { useTexture } from "@react-three/drei";
import { baseUrl } from "../../global.ts";
import * as THREE from "three";
import Nose from "./Nose.tsx";

export default function MainTrailer() {

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

			{/* <Environment preset="city" /> */}

			{/* TRAILER BASIC */}
			<Chassis />
			<Nose />
			<TrailerNose/>
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
