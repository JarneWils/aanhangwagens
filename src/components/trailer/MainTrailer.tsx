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

export default function MainTrailer() {
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
		</>
	);
}
