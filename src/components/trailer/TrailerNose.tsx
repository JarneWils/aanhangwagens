import useMeasurements from "../stores/useMeasurements";
import { useGLTF, useTexture } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import useButtonState from "../stores/useButtonState";
import { baseUrl } from "../../global";

export default function TrailerNose() {
	/**
	 * TEXTURES
	 */
	const metalTexture = useTexture({
		map: `${baseUrl}/textures/metal2.0/concrete_floor_02_diff_4k_2.0.jpg`,
		roughnessMap: `${baseUrl}/textures/metal/concrete_floor_worn_001_rough_4k.jpg`,
		aoMap: `${baseUrl}/textures/metal/concrete_floor_worn_001_ao_4k.jpg`,
	});

	Object.values(metalTexture).forEach((texture) => {
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(1.5, 0.2);
	});

	const metal = useMemo(() => {
		const mat = new THREE.MeshStandardMaterial({
			...metalTexture,
			color: "#bbbbbb",
			roughness: 0.2,
			metalness: 0.4,
		});
		return mat;
	}, [metalTexture]);

	const rubber = useMemo(() => {
		const mat = new THREE.MeshStandardMaterial({
			color: "#232323",
			roughness: 0.5,
			metalness: 0,
		});
		return mat;
	}, []);

	const { nodes } = useGLTF(`${baseUrl}/models/trekhaak.glb`) as any;

	const frameLength = useMeasurements((state: { frameLength: number }) => state.frameLength);
	const jockeyWheel = useButtonState((state) => {
		return state.jockeyWheel;
	});

	return (
		<>
			<group rotation-y={-Math.PI * 0.5} position={[-frameLength / 2 - 0.6, 0.02, 0]} scale={1.15}>
				<group rotation={[Math.PI / 2, 0, 0]} scale={0.361}>
					<group position={[0, -0.02, 0.178]}>
						<mesh
							name="trekhhaak-hendel"
							castShadow
							receiveShadow
							geometry={nodes.handle_low.geometry}
							material={metal}
						/>
						<mesh
							name="trekhaak-blok"
							castShadow
							receiveShadow
							geometry={nodes.uchyt_low.geometry}
							material={metal}
							scale={[0.75, 1, 1]}
							position={[0, -0.01, 0.02]}
						/>
					</group>

					{jockeyWheel ? (
						<group name="Wieletje" position={[0.115, -0.15, 0.2]}>
							<mesh castShadow receiveShadow geometry={nodes.kolecko_low.geometry} material={rubber} />
							<mesh castShadow receiveShadow geometry={nodes.nozicka_low.geometry} material={metal} />
						</group>
					) : null}

					<mesh name="kabel" castShadow receiveShadow geometry={nodes.kabel_low.geometry} material={rubber} />
					<mesh name="stekker" castShadow receiveShadow geometry={nodes.zasuvka_low.geometry} material={rubber} />
				</group>
			</group>
		</>
	);
}

useGLTF.preload("./models/trekhaak.glb");
