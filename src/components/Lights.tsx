export default function Lights() {
	return (
		<>
			<ambientLight color="#ffffff" intensity={3.5} />
			<directionalLight color="#aaaaaa" position={[1, 0.4, -6]} intensity={4}/>

			<directionalLight color="#bcbcbc" position={[-1, 1, 6]} intensity={5} />
			<directionalLight
				color="#E3D8D0"
				castShadow
				shadow-normalBias={0.04}
				shadow-mapSize-width={256}
				shadow-mapSize-height={256}
				position={[-1, 8, 0]}
				intensity={3}
			/>
		</>
	);
}
