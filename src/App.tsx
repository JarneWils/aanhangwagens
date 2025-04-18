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
import { Environment, SoftShadows } from "@react-three/drei";
import { BrightnessContrast, EffectComposer, N8AO, ToneMapping } from "@react-three/postprocessing";
import { baseUrl } from "./global.ts";
import { ToneMappingMode } from "postprocessing";
// import PopUp from "./components/configurator/PopUp.tsx";

export default function App() {
	// Haal de darkMode uit de store
	const { fullScreen, screenShot, darkMode } = useButtonState(
	  (state) => ({
		fullScreen: state.fullScreen,
		screenShot: state.screenShot,
		darkMode: state.darkMode,
	  }),
	  shallow
	);
  
	const centeredPosition: [number, number, number] = [-2, 0.5, 4];
	
	// camera position look at y of 2
	function CameraController() {
	  const { camera } = useThree();
  
	  useEffect(() => {
		camera.position.set(...centeredPosition);
	  }, [camera]);
  
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
		{screenShot === true ? <div className="screenshot-cover"></div> : null}
		<script src="https://cdn.jsdelivr.net/npm/emailjs-com@2.6.4/dist/email.min.js"></script>
		<StrictMode>
		  {!fullScreen && <Calculations />}
		  <BackButton />
		  <Loader />
		  <Canvas
			gl={{ alpha: true }}
			shadows
			camera={{ fov: 45, near: 0.1, far: 200, position: centeredPosition }}
			onCreated={({ camera, gl }) => {
			  if (camera && gl) {
				useThreeStore.getState().setCamera(camera as PerspectiveCamera);
				useThreeStore.getState().setRenderer(gl);
			  }
			}}>
			<EffectComposer multisampling={8}>
			  <N8AO halfRes={false} aoRadius={18} distanceFalloff={0.5} intensity={3} screenSpaceRadius renderMode={0} />
			  <ToneMapping mode={ToneMappingMode.NEUTRAL} />
			  <BrightnessContrast contrast={0.12} brightness={-0.02} />
			</EffectComposer>
  
			<Environment
			  files={`${baseUrl}/img/environment2.hdr`}
			  environmentIntensity={darkMode ? 1.5 : 3.5}
			/>
			<SoftShadows size={4} samples={20} focus={0.2} />
			<CameraController />
			<Scene />
		  </Canvas>
		  {!fullScreen && <Configurator />}
		</StrictMode>
	  </div>
	);
  }
  