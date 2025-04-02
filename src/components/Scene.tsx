import { OrbitControls } from "@react-three/drei";
// import { Perf } from "r3f-perf";

import Lights from "./Lights";
import MainTrailer from "./trailer/MainTrailer";
import useButtonState from "./stores/useButtonState";
// import { Suspense } from "react";
import { useEffect } from "react";
import useThreeStore from "./stores/useThreeStore";
import { useThree } from "@react-three/fiber";

export default function Scene() {
	const { gl, scene } = useThree();

	// de renderer en scene in de store zetten.
	useEffect(() => {
		if (!gl || !scene) return;
		useThreeStore.getState().setRenderer(gl);
		useThreeStore.getState().setScene(scene);
	}, [gl, scene]);

	const fullScreen = useButtonState((state) => {
		return state.fullScreen;
	});

	return (
		<>
			<color attach="background" args={["#f8f8f8"]} />
			{/*<fog attach="fog" args={["#eeeeee", 16, 25]} /> */}

			<OrbitControls
				maxPolarAngle={Math.PI / 2}
				enableZoom={true}
				minDistance={fullScreen ? 1.5 : 4}
				maxDistance={16}
			/>

			<Lights />

			{/* <Suspense
				fallback={
					<mesh position={[0, -0.5, 0]}>
						<boxGeometry args={[2.3, 1, 1.2, 2, 2, 2]} />
						<meshBasicMaterial color={"#ff5102"} wireframe={true} />
					</mesh>
				}>
					<group position={[ 0, fullScreen ? 0.1 : -0.5, 0]}><MainTrailer/></group>
				
			</Suspense> */}
			
			<group position={[ 0, fullScreen ? 0.1 : -0.5, 0]}><MainTrailer/></group>

			{/* FLOOR */}
			<mesh position-y={fullScreen ? -0.4 : -1} rotation-x={-Math.PI * 0.5} scale={40} receiveShadow>
				<planeGeometry />
				<shadowMaterial transparent={true} color={"grey"} opacity={0.25} />
			</mesh>

			{/* <Perf position="top-left" /> */}
		</>
	);
}
