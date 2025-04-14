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
// import { baseUrl } from "./global.ts";
import { SoftShadows } from "@react-three/drei";
// import PopUp from "./components/configurator/PopUp.tsx";

export default function App() {
	//full screen
	const { fullScreen, screenShot } = useButtonState(
		(state) => ({
			fullScreen: state.fullScreen,
			screenShot: state.screenShot,
		}),
		shallow
	);
	const centeredPosition: [number, number, number] = [-3, 1, 5];
	

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
			{
			screenShot === true ?
			<>
				<div className="screenshot-cover"></div>
			</>
			: null
			}
			<script src="https://cdn.jsdelivr.net/npm/emailjs-com@2.6.4/dist/email.min.js"></script>
			<StrictMode>
				{!fullScreen && <Calculations />}
				<BackButton />
				<Loader/>
				<Canvas
					gl={{ alpha: true }}
					shadows
					camera={{ fov: 45, near: 0.1, far: 200, position: centeredPosition, }}
					onCreated={({ camera, gl }) => {
						if (camera && gl) {
							useThreeStore.getState().setCamera(camera as PerspectiveCamera);
							useThreeStore.getState().setRenderer(gl);
						}
					}}>
					{/* <Environment files={`${baseUrl}/img/environment1.jpg`} /> */}
					<SoftShadows size={4} samples={20} focus={0.2}/>
					<CameraController />
					<Scene />
				</Canvas>
				{!fullScreen &&<>
				{/* <PopUp position="top" invert={false}/> */}
				<Configurator />
				</>}
			</StrictMode>
		</div>
	);
}
