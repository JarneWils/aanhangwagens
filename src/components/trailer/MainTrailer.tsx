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
import useButtonState from "../stores/useButtonState.tsx";
import { shallow } from "zustand/shallow";

export default function MainTrailer() {
	
	const {darkMode} = useButtonState(
		(state) => ({
			darkMode: state.darkMode,
		}),
		shallow
	);

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

			{/*Floor*/}
			<group visible={darkMode}>
				<mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={100} receiveShadow>
					<planeGeometry />
					<meshBasicMaterial color={"#505050"} opacity={0.25} />
				</mesh>
			</group>

		</>
	);
}
