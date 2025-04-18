import { OrbitControls } from "@react-three/drei";
// import { Perf } from "r3f-perf";

import Lights from "./Lights";
import MainTrailer from "./trailer/MainTrailer";
import useButtonState from "./stores/useButtonState";
// import { Suspense } from "react";
import { useEffect } from "react";
import useThreeStore from "./stores/useThreeStore";
import { useThree } from "@react-three/fiber";
import "../style.css";
import { shallow } from "zustand/shallow";

export default function Scene() {

	const { scene } = useThree();

	// de renderer en scene in de store zetten.
	useEffect(() => {
		if (!scene) return;
		useThreeStore.getState().setScene(scene);
	}, [scene]);
	

	const {fullScreen, darkMode, screenShot} = useButtonState(
		(state) => ({
			fullScreen: state.fullScreen,
			darkMode: state.darkMode,
			screenShot: state.screenShot,
		}),
		shallow
	);

	return (
		<>
		{ /* screenShot === true ? <color attach="background" args={["#DCFBFF"]} /> : */ darkMode === false ? <color attach="background" args={["#f4f7f7"]} /> : <color attach="background" args={["#505050"]} />}
		{darkMode === true ? <fog attach="fog" args={["#505050", 16, 25]} /> : null}

			<OrbitControls
				target={ screenShot === true ? [0,-0.3,0] : fullScreen === true ? [0,0.2,0] : [0,-0.2,0]}
				maxPolarAngle={Math.PI / 2}
				enableZoom={true}
				minDistance={fullScreen ? 1 : 2.5}
				maxDistance={16}
			/>

			<Lights />

			{/* <Suspense
				fallback={
				<Loader />
					<mesh position={[0, -0.5, 0]}>
						<boxGeometry args={[2.3, 1, 1.2, 2, 2, 2]} />
						<meshBasicMaterial color={"#ff5102"} wireframe={true} />
					</mesh>
				}>
					<group position={[ 0, fullScreen ? 0.1 : -0.5, 0]}><MainTrailer/></group>
				
			</Suspense> */}
			
			<group position={[ 0, fullScreen ? 0.1 : -0.5, 0]}><MainTrailer/></group>

			{/* FLOOR */}
			<mesh position-y={fullScreen ? -0.4 : -1} rotation-x={-Math.PI * 0.5} scale={20} receiveShadow>
				<planeGeometry />
				<shadowMaterial transparent={true} color={"#000000"} opacity={darkMode ? 1 : 0.2} />
			</mesh>

			{/* <Perf position="top-left" /> */}
		</>
	);
}
