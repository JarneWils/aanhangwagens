import useMeasurements from "../stores/useMeasurements"
import { useMemo, useEffect } from "react"
import * as THREE from 'three'
import React from "react"
import { useGLTF, useTexture } from "@react-three/drei"
import { baseUrl } from "../../global"
import { shallow } from "zustand/shallow"
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js"
import { useSpecialGeometry } from "../hooks/useSpecialGeometry"
import useButtonState from "../stores/useButtonState"
import useNormalBasedCubeUVs from "../hooks/useNormalBasedCubeUvs"


export default function Details ()
{
    // LENGTH
    const {frameLength, frameWidth, plankHeight} = useMeasurements(
    (state) => {
        return {
            frameLength: state.frameLength,
            frameWidth: state.frameWidth,
            plankHeight: state.plankHeight
        }}, shallow
    )
    const {gateOpen} = useButtonState(
        (state) => {
            return {
                gateOpen: state.gateOpen
            }
        }, shallow
    )

    /**
     * TEXTURES
     */
    const sharedTextures = useTexture({
        map: `${baseUrl}/textures/lights/backlight-diff.jpg`,
        normalMap: `${baseUrl}/textures/lights/backlight-norm.jpg`,
    })
    
    const backLightTexture2 = {
        map: sharedTextures.map.clone(),
        normalMap: sharedTextures.normalMap.clone(),
    }
    Object.values(backLightTexture2).forEach((texture) => {
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        texture.repeat.set(0.4, 0.2)
    })
    
    const backLightTexture = {
    map: sharedTextures.map.clone(),
    normalMap: sharedTextures.normalMap.clone(),
    }
    Object.values(backLightTexture).forEach((texture) => {
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        texture.repeat.set(1, 1)
    })

    const metalTexture = useTexture({
		map: `${baseUrl}/textures/metal2.0/concrete_floor_02_diff_4k_2.0.jpg`,
		normalMap: `${baseUrl}/textures/metal/concrete_floor_worn_001_nor_gl_4k.jpg`,
		// roughnessMap: `${baseUrl}/textures/metal2.0/concrete_floor_02_rough_4k.jpg`,
		// aoMap: `${baseUrl}/textures/metal/concrete_floor_worn_001_ao_4k.jpg`,
	});
	Object.values(metalTexture).forEach((texture) => {
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(2, 2.5);
	});

	const stealMatcap = useTexture(`${baseUrl}/matcaps/steal6.4.png`);
	stealMatcap.colorSpace = THREE.SRGBColorSpace;
      

    /**
     * MATERIALS
     */
    const metal = useMemo(() => {
        const mat = new THREE.MeshStandardMaterial({
            color: '#ababb5',
            roughness: 0.2,
            metalness: 0.9,
            side: THREE.DoubleSide,
        })
        return mat
    }, [])

    const metal2 = useMemo(() => {
        const mat = new THREE.MeshStandardMaterial({
            color: '#c5c0c5',
            roughness: 0.3,
            metalness: 0.8,
            side: THREE.DoubleSide,
        })
        return mat
    }, [])

    const scharnierMaterial = useMemo(() => {
		const mat = new THREE.MeshMatcapMaterial({
			... metalTexture,
			color: "#ffffff",
			matcap: stealMatcap,
		});
		return mat;
	}, [metalTexture, stealMatcap]);

    const backLightMaterial = useMemo(() => {
        const mat = new THREE.MeshStandardMaterial({
            ...backLightTexture,
            color: '#333333',
            roughness: 0.5,
            metalness: 0,
        })
        return mat
    }, [])

    const redBackLightMaterial = useMemo(() => {
        const mat = new THREE.MeshStandardMaterial({
            ...backLightTexture,
            color: 'rgb(210, 49, 49)',
            roughness: 0.5,
            metalness: 0.4,
            transparent: true,
            opacity: 0.9,
        })
        return mat
    }, [])
    const redBackLightMaterial2 = useMemo(() => {
        const mat = new THREE.MeshStandardMaterial({
            ...backLightTexture2,
            color: '#ee0000',
            roughness: 0.5,
            metalness: 0.4,
            transparent: true,
            opacity: 0.9,
        })
        return mat
    }, [])
    const orangeBackLightMaterial = useMemo(() => {
        const mat = new THREE.MeshStandardMaterial({
            ...backLightTexture,
            color: '#ffa500',
            roughness: 0.5,
            metalness: 0.4,
            transparent: true,
            opacity: 0.9,
        })
        return mat
    }, [])
    const orangeBackLightMaterial2 = useMemo(() => {
        const mat = new THREE.MeshStandardMaterial({
            ...backLightTexture2,
            color: '#ffa500',
            roughness: 0.4,
            metalness: 0.5,
            transparent: true,
            opacity: 0.9,
        })
        return mat
    }, [])
    const whiteBackLightMaterial = useMemo(() => {
        const mat = new THREE.MeshStandardMaterial({
            ...backLightTexture,
            color: '#ffffff',
            roughness: 0.4,
            metalness: 0.2,
            transparent: true,
            opacity: 0.5,
        })
        return mat
    }, [])
    const whiteBackLightMaterial2 = useMemo(() => {
        const mat = new THREE.MeshStandardMaterial({
            ...backLightTexture2,
            color: '#ffffff',
            roughness: 0.4,
            metalness: 0.2,
            transparent: true,
            opacity: 0.4,
        })
        return mat
    }, [])

    /**
     * GEOMETRIES
     */
    const tube = useMemo(() => {
        const path = new THREE.CubicBezierCurve3(
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0.25, 0.5, 0),
            new THREE.Vector3(0.75, 0.5, 0),
            new THREE.Vector3(1, 0, 0)
        )
        return new THREE.TubeGeometry(path, 4, 0.06, 6, false)
    },[])

    const roundedBox = useMemo(() => {
        const geo = new RoundedBoxGeometry(3, 1.5, 0.07, 2, 1)
        return new THREE.Mesh(geo)
    },[])

    // trailer gate
    const curve = useMemo(() => {
        // 3D punten voor de haak met 90 graden bocht
        const points = [
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(0, 0, 2),
          new THREE.Vector3(2, 0, 2), // 90° hoek naar rechts
        ];
    
        return new THREE.CatmullRomCurve3(points);
    }, []);

    const cylinder = new THREE.CylinderGeometry(0.01, 0.01, 0.04, 32,);
	useNormalBasedCubeUVs(cylinder);

    const scharnier = useSpecialGeometry(0.01, plankHeight, 0.03, 1, 0)

    /**
     * MODEL
     */
    const { nodes} = useGLTF(`${baseUrl}/models/backlights.glb`) as any

    const scharnierModel = useGLTF(`${baseUrl}/models/scharnier.glb`) as any
    //clone the model
    const scharnierModelClone = scharnierModel.scene.clone()

    scharnierModel.scene.traverse((child: any) => {
		if (child.isMesh) {
			child.material = metal2;
			child.material.needsUpdate = true;
		}
	});

    /**
     * DISPOSE
     */
    useEffect(()=>{
        return () => {
            metal.dispose()
            tube.dispose()
            scharnier.dispose()
        };
    }, [metal, tube, scharnier])


    /**
     * Reflector positions
     */
    let reflectorX = 1.2
    if (frameLength > 1.8) {
        reflectorX = 1.7
    }
    if (frameLength > 2.3) {
        reflectorX = 2.2
    }
    if (frameLength > 2.8) {
        reflectorX = 2.7
    }
    if (frameLength > 3.3) {
        reflectorX = 3.2
    }
    if (frameLength > 3.8) {
        reflectorX = 3.7
    }
    if (frameLength > 4.3) {
        reflectorX = 4.2
    }
    if (frameLength > 4.8) {
        reflectorX = 4.7
    }
    if (frameLength > 5.3) {
        reflectorX = 5.2
    }
    

    return <>
        {Array.from({ length: 6 }).map((_, i) => {
        const positionX = i * (frameLength / 6) - (5 * (frameLength / 12));
            return (
            <React.Fragment key={`haakjes-${i}`}>
                <mesh
                castShadow
                geometry={tube}
                material={metal}
                key={`haakje-left-${i}-unique`}
                scale={[0.1, 0.1, 0.1]}
                rotation={[Math.PI * 0.5, Math.PI * 0.5, - Math.PI * 0.3]}
                position={[positionX, - 0.06, frameWidth / 2 +0.06]}>
                </mesh>
                <mesh
                castShadow
                geometry={tube}
                material={metal}
                key={`haakje-right-${i}-unique`}
                scale={[0.1, 0.1, 0.1]}
                rotation={[- Math.PI * 0.5, - Math.PI * 0.5, - Math.PI * 0.3]}
                position={[positionX, -0.065, - (frameWidth / 2 + 0.065)]}>
                </mesh>
            </React.Fragment>
            );
        })}
        <group
        name="backlight-left"
        scale={0.06}
        position={[frameLength / 2 - 0.03, -0.1, frameWidth / 2 - 0.15]}
        rotation={[0, Math.PI / 2, 0]}>
            
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube.geometry}
                material={backLightMaterial}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube001.geometry}
                material={redBackLightMaterial}
                position={[0, 0, 1.037]}
                rotation={[0, 0, -2.356]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube002.geometry}
                material={whiteBackLightMaterial}
                position={[0.377, 0.467, 1.037]}
                rotation={[0, 0, Math.PI]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube003.geometry}
                material={orangeBackLightMaterial}
                position={[-0.364, 0.467, 1.037]}
                rotation={[0, 0, -Math.PI / 2]}
            />
        </group>
        <group
        name="backlight-right"
        scale={0.06}
        position={[frameLength / 2 - 0.03, -0.1, - (frameWidth / 2 - 0.15)]}
        rotation={[0, Math.PI / 2, 0]}>
            
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube.geometry}
                material={backLightMaterial}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube001.geometry}
                material={redBackLightMaterial}
                position={[0, 0, 1.037]}
                rotation={[0, 0, -2.356]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube002.geometry}
                material={orangeBackLightMaterial}
                position={[0.377, 0.467, 1.037]}
                rotation={[0, 0, Math.PI]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube003.geometry}
                material={whiteBackLightMaterial}
                position={[-0.364, 0.467, 1.037]}
                rotation={[0, 0, -Math.PI / 2]}
            />
        </group>

        <group
        name="side-flectors1"
        visible={frameLength > 1.3}>
            <mesh
                castShadow
                receiveShadow
                geometry={roundedBox.geometry}
                material={orangeBackLightMaterial2}
                position={[- (frameLength/2 - reflectorX), plankHeight/2 + 0.025, frameWidth / 2 + 0.035]}
                scale={[0.025, 0.025, 0.1]}
                rotation={[0, 0, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={roundedBox.geometry}
                material={orangeBackLightMaterial2}
                position={[- (frameLength/2 - reflectorX), plankHeight/2 + 0.025, - (frameWidth / 2 + 0.035)]}
                scale={[0.025, 0.025, 0.1]}
                rotation={[0, 0, 0]}
            />
        </group>

        <group
        name="side-flectors2">
            <mesh
                castShadow
                receiveShadow
                geometry={roundedBox.geometry}
                material={orangeBackLightMaterial2}
                position={[-(frameLength/2 -0.23), plankHeight/2 + 0.025, frameWidth / 2 + 0.035]}
                scale={[0.025, 0.025, 0.1]}
                rotation={[0, 0, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={roundedBox.geometry}
                material={orangeBackLightMaterial2}
                position={[-(frameLength/2 -0.23), plankHeight/2 +0.025, - (frameWidth / 2 + 0.035)]}
                scale={[0.025, 0.025, 0.1]}
                rotation={[0, 0, 0]}
            />
        </group>

        <group
        name="wheel-flectors-back"
        position={ frameLength> 2.7 ? [0.385,0,0] : [0,0,0]}>
            <mesh
                castShadow
                receiveShadow
                geometry={roundedBox.geometry}
                material={redBackLightMaterial2}
                position={[0.385, -0.125, frameWidth / 2 + 0.15]}
                scale={[0.025, 0.025, 0.1]}
                rotation={[0, -Math.PI * 0.5, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={roundedBox.geometry}
                material={redBackLightMaterial2}
                position={[0.385, -0.125, - (frameWidth / 2 + 0.15)]}
                scale={[0.025, 0.025, 0.1]}
                rotation={[0, -Math.PI * 0.5, 0]}
            />
        </group>
        <group
        name="wheel-flectors-front"
        rotation={[0, Math.PI, 0]}
        position={ frameLength> 2.7 ? [-0.385,0,0] : [0,0,0]}>
            <mesh
                castShadow
                receiveShadow
                geometry={roundedBox.geometry}
                material={whiteBackLightMaterial2}
                position={[0.385, -0.125, frameWidth / 2 + 0.15]}
                scale={[0.025, 0.025, 0.1]}
                rotation={[0, -Math.PI * 0.5, 0]}
            />
            
            <mesh
                castShadow
                receiveShadow
                geometry={roundedBox.geometry}
                material={whiteBackLightMaterial2}
                position={[0.385, -0.125, - (frameWidth / 2 + 0.15)]}
                scale={[0.025, 0.025, 0.1]}
                rotation={[0, -Math.PI * 0.5, 0]}
            />
        </group>
        <group
        name="trailer-gate"
        position={[0, 0, 0]}>
            <mesh
                name="haakje-left"
                material={metal}
                geometry={new THREE.TubeGeometry(curve, 20, 0.15, 8, false)}
                scale={[0.025, 0.05, 0.025]}
                rotation={[Math.PI, Math.PI * 0.5, 0]}
                position={[frameLength/2 - 0.045, -0.01, frameWidth/2 - 0.354]}>
            </mesh>
            <mesh
                name="haakje-right"
                material={metal}
                geometry={new THREE.TubeGeometry(curve, 20, 0.15, 8, false)}
                scale={[0.025, 0.05, 0.025]}
                rotation={[0, Math.PI * 0.5, 0]}
                position={[frameLength/2 - 0.045, -0.01, -(frameWidth/2 - 0.354)]}>
            </mesh>
            <group visible={plankHeight < 0.2}>
                <mesh
                    name="scharnierplaat-left"
                    material={scharnierMaterial}
                    geometry={scharnier}
                    position={[frameLength/2 + 0.005, !gateOpen ? plankHeight/2 -0.005 : -plankHeight/2 - 0.005, frameWidth/2 - 0.325]}>
                </mesh>
                <mesh
                    name="scharnierplaat-right"
                    material={scharnierMaterial}
                    geometry={scharnier}
                    position={[frameLength/2 + 0.005, !gateOpen ? plankHeight/2 -0.005 : -plankHeight/2 - 0.005, -(frameWidth/2 - 0.325)]}>
                </mesh>
            </group>
            <group visible={plankHeight >= 0.2}>
                <primitive
                    object={scharnierModel.scene}
                    position={[frameLength/2 + 0.006, -0.01, frameWidth/2 - 0.325]}
                    rotation={[0, !gateOpen ? Math.PI * 0.5 : - Math.PI * 0.5, gateOpen ? Math.PI : 0]}
                    scale={[0.15, 0.15, 0.15]}
                />
                <primitive
                    object={scharnierModelClone}
                    position={[frameLength/2 + 0.006, -0.01,  - (frameWidth/2 - 0.325)]}
                    rotation={[0, !gateOpen ? Math.PI * 0.5 : - Math.PI * 0.5, gateOpen ? Math.PI : 0]}
                    scale={[0.15, 0.15, 0.15]}
                />
            </group>

            <mesh
                name="cylinder-left"
                material={scharnierMaterial}
                geometry={cylinder}
                rotation={[Math.PI / 2, 0, 0]}
                position={[frameLength/2 + 0.006, -0.01, frameWidth/2 - 0.325]}>
            </mesh>
            <mesh
                name="cylinder-right"
                material={scharnierMaterial}
                geometry={cylinder}
                rotation={[Math.PI / 2, 0, 0]}
                position={[frameLength/2 + 0.006, -0.01, -(frameWidth/2 - 0.325)]}>
            </mesh>

        </group>
    </>
}

useGLTF.preload(`${baseUrl}/models/scharnier.glb`)