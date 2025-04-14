import { shallow } from "zustand/shallow";
import useButtonState from "./stores/useButtonState";

export default function Lights() {
	const {darkMode} = useButtonState(
		(state) => ({
			darkMode: state.darkMode,
		}),
		shallow
	);
	return (
		<>
			<ambientLight color="#ffffff" intensity={darkMode ? 3 : 2} />
			<directionalLight color="#aaaaaa" position={[1, 0.4, -6]} intensity={darkMode ? 2 : 3}/>

			<directionalLight color="#bcbcbc" position={[-1, 1, 6]} intensity={darkMode ? 2 : 3}/>
			<directionalLight
				color="#E3D8D0"
				castShadow
				shadow-normalBias={0.04}
				shadow-mapSize-width={256}
				shadow-mapSize-height={256}
				position={[1, 8, 0]}
				intensity={darkMode ? 2.5 : 1.5 }
			/>
		</>
	);
}

// export default function Lights() {
// 	return (
// 		<>
// 			{/* Zachte algemene verlichting */}
// 			<ambientLight intensity={2} />

// 			{/* Hoofdlicht (key light) – zorgt voor richting en schaduwen */}
// 			<directionalLight
// 				color="#ffffff"
// 				position={[1, 10, 1]}
// 				intensity={2}
// 				castShadow
// 				shadow-normalBias={0.04}
// 				shadow-mapSize-width={256}
// 				shadow-mapSize-height={256}
// 			/>

// 			{/* Invullicht (fill light) – verzacht schaduwen */}
// 			<directionalLight
// 				color="#ffffff"
// 				position={[-5, 4, 6]}
// 				intensity={4}
// 			/>

// 			{/* Achterlicht (rim light) – scheidt object van achtergrond */}
// 			<directionalLight
// 				color="#ffffff"
// 				position={[0, 4, -6]}
// 				intensity={4}
// 			/>
// 		</>
// 	);
// }
