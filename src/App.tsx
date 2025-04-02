import { StrictMode, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import "./style.css";

// COMPONENTS
import Scene from "./components/Scene";
import Configurator from "./components/configurator/Configurator.tsx";
import Calculations from "./components/stores/Calculations.tsx";

// STORES
import useButtonState from "./components/stores/useButtonState.tsx";
import useThreeStore from "./components/stores/useThreeStore.tsx";
import BackButton from "./components/configurator/BackButton.tsx";
import Loader from "./components/configurator/Loader.tsx";
import { shallow } from "zustand/shallow";
import { PerspectiveCamera } from "three";
// import { SoftShadows } from "@react-three/drei";

export default function App() {
	//full screen
	const { fullScreen } = useButtonState(
		(state) => ({
			fullScreen: state.fullScreen,
		}),
		shallow
	);
	const centeredPosition: [number, number, number] = [-4, 1, 4];
	

	//camera position look at y of 2
	function CameraController() {
		const { camera } = useThree();
		const cameraCenter = useButtonState((state) => {
			return state.cameraCenter;
		});

		useEffect(() => {
			camera.position.set(...centeredPosition);
		}, [cameraCenter, camera]);


		return undefined;
	}

	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div
			className="main"
			style={{
				width: fullScreen === true || windowWidth <= 900 ? "100vw" : `82vw`,
				height: fullScreen ? "100vh" : windowWidth >= 900 ? "85vh" : "50vh",
				top: "-8vh",
			}}>
			<script src="https://cdn.jsdelivr.net/npm/emailjs-com@2.6.4/dist/email.min.js"></script>
			<StrictMode>
				{!fullScreen && <Calculations />}
				<BackButton />
				<Loader />
				{/* Camera look at 1, 0, 0 */}
				<Canvas
					gl={{ alpha: true }}
					// style={{ backgroundColor: "#eeeeee" }}
					shadows
					camera={{ fov: 45, near: 0.1, far: 200, position: centeredPosition, }}
					onCreated={({ camera, gl }) => {
						if (camera && gl) {
							useThreeStore.getState().setCamera(camera as PerspectiveCamera);
							useThreeStore.getState().setRenderer(gl);
						}
					}}>
					{/* <SoftShadows size={12} samples={20} focus={0.4}/> */}
					<CameraController />
					<Scene />
				</Canvas>
				{!fullScreen && <Configurator />}
			</StrictMode>
		</div>
	);
}
