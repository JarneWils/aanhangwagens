import useMeasurements from "../stores/useMeasurements"
import { useMemo, useEffect } from "react"
import * as THREE from 'three'
import React from "react"
import { useGLTF, useTexture } from "@react-three/drei"
import { baseUrl } from "../../global"
import { shallow } from "zustand/shallow"
// import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js"
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

    const reflectorTexture = useTexture({
        map: `${baseUrl}/textures/Reflector/reflection3.jpg`,
    })
    Object.values(reflectorTexture).forEach((texture) => {
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(0.2, 3);
	});

    const metalTexture = useTexture({
		map: `${baseUrl}/textures/metal2.0/concrete_floor_02_diff_4k_2.0.jpg`,
		normalMap: `${baseUrl}/textures/metal/concrete_floor_worn_001_nor_gl_4k.jpg`,
	});
	Object.values(metalTexture).forEach((texture) => {
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(2, 2.5);
	});

    const reflectorTexture2 = useTexture({
        map: `${baseUrl}/textures/Reflector/reflection4.jpg`,
    })
    Object.values(reflectorTexture2).forEach((texture) => {
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(1, 2);
	});

    const reflectorTexture3 = useTexture({
        map: `${baseUrl}/textures/Reflector/reflection2.jpg`,
    })
    Object.values(reflectorTexture3).forEach((texture) => {
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(0.5, 0.5);
	}); 

    const scharnierTexture = useTexture({
		map: `${baseUrl}/textures/metal/math-metal-col.jpg`,
		normalMap: `${baseUrl}/textures/metal/concrete_floor_worn_001_nor_gl_4k.jpg`,
	});
	Object.values(scharnierTexture).forEach((texture) => {
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(2, 0.5);
	});

	const stealMatcap = useTexture(`${baseUrl}/matcaps/steal6.4.png`);
	stealMatcap.colorSpace = THREE.SRGBColorSpace;

    const reflectorMatcap = useTexture(`${baseUrl}/matcaps/reflection6.png`);
	reflectorMatcap.colorSpace = THREE.SRGBColorSpace;

    const reflectorMatcapSoft = useTexture(`${baseUrl}/matcaps/reflection5.png`);
	reflectorMatcapSoft.colorSpace = THREE.SRGBColorSpace;

    const reflectorMatcapLight = useTexture(`${baseUrl}/matcaps/steal6.5.png`);
	reflectorMatcapLight.colorSpace = THREE.SRGBColorSpace;
      

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
            ... scharnierTexture,
            color: 'rgb(189, 192, 203)',
            roughness: 0.3,
            metalness: 0.6,
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
            roughness: 0.6,
            metalness: 0.2,
        })
        return mat
    }, [])

    const redBackLightMaterial2 = useMemo(() => {
        const mat = new THREE.MeshMatcapMaterial({
            ...reflectorTexture3,
            color: 'rgb(255, 8, 8)',
            matcap: reflectorMatcapSoft,
        })
        return mat
    }, [])
    const redBackLightMaterial3 = useMemo(() => {
        const mat = new THREE.MeshMatcapMaterial({
            ...reflectorTexture2,
            color: 'rgb(255, 8, 8)',
            matcap: reflectorMatcapSoft,
        })
        return mat
    }, [])
    const redBackLightMaterial4 = useMemo(() => {
        const mat = new THREE.MeshMatcapMaterial({
            ...reflectorTexture2,
            color: 'rgb(255, 115, 115)',
            matcap: reflectorMatcapLight,
        })
        return mat
    }, [])


    const orangeBackLightMaterial3 = useMemo(() => {
        const mat = new THREE.MeshMatcapMaterial({
            ...reflectorTexture,
            color: 'rgb(255, 175, 95)',
            matcap: reflectorMatcap,
        })
        return mat
    }, [])
    const orangeBackLightMaterial4 = useMemo(() => {
        const mat = new THREE.MeshMatcapMaterial({
            ...reflectorTexture2,
            color: 'rgb(255, 175, 95)',
            matcap: reflectorMatcapLight,
        })
        return mat
    }, [])


    const whiteBackLightMaterial2 = useMemo(() => {
        const mat = new THREE.MeshMatcapMaterial({
            ...reflectorTexture3,
            color: '#ffffff',
            matcap: reflectorMatcap,
        })
        return mat
    }, [])
    const whiteBackLightMaterial3 = useMemo(() => {
        const mat = new THREE.MeshMatcapMaterial({
            ...reflectorTexture2,
            color: 'rgb(255, 255, 255)',
            matcap: reflectorMatcapLight,
        })
        return mat
    }, [])


    const stealMatcap2 = useTexture(`${baseUrl}/matcaps/steal5.2.png`);
	stealMatcap2.colorSpace = THREE.SRGBColorSpace;
	const rubber = useMemo(() => {
		const mat = new THREE.MeshMatcapMaterial({
			// ... metalTexture,
			color: "#ababab",
			matcap: stealMatcap2,
		});
		return mat;
	}, [metalTexture, stealMatcap]);

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

    // const roundedBox = useMemo(() => {
    //     const geo = new RoundedBoxGeometry(3, 1.5, 0.07, 2, 1)
    //     return new THREE.Mesh(geo)
    // },[])

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

    const cylinderReflector = new THREE.CylinderGeometry(0.5, 0.5, 0.25, 32,);
	useNormalBasedCubeUVs(cylinderReflector);

    const scharnier = useSpecialGeometry(0.01, plankHeight, 0.03, 1, 0)

    /**
     * MODEL
     */

    const {nodes: nodes3} = useGLTF(`${baseUrl}/models/backlights3.0.glb`) as any

    const { nodes: nodes2} = useGLTF(`${baseUrl}/models/reflectorSide.glb`) as any

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
        name="backlight_LEFT"
        scale={0.05}
        position={[frameLength / 2 - 0.034, -0.055, frameWidth / 2 - 0.15]}
        rotation={[0, - Math.PI / 2, 0]}>         
            <mesh
                castShadow
                receiveShadow
                geometry={nodes3.BLACK.geometry}
                material={backLightMaterial}
                scale={[1.991, 1, 0.075]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes3.Zilver.geometry}
                material={backLightMaterial}
                position={[1.348, 0.657, -0.247]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[0.078, 0.023, 0.078]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes3.red3.geometry}
                material={redBackLightMaterial4}
                position={[-0.008, -0.303, -0.14]}
                rotation={[Math.PI / 2, 0, 0]}
                scale={[1, 0.113, 1]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes3.red.geometry}
                material={redBackLightMaterial3}
                position={[-1.279, 0, -0.126]}
                scale={[0.325, 1, 0.109]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes3.red2.geometry}
                material={redBackLightMaterial3}
                position={[1.271, 0, -0.126]}
                rotation={[-Math.PI, 0, 0]}
                scale={[-0.325, -1, -0.109]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes3.white.geometry}
                material={whiteBackLightMaterial3}
                position={[-1.279, 0, -0.126]}
                scale={[0.325, 1, 0.109]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes3.orange.geometry}
                material={orangeBackLightMaterial4}
                position={[1.268, 0, -0.126]}
                rotation={[-Math.PI, 0, 0]}
                scale={[-0.325, -1, -0.109]}
            />
        </group>

        <group
        name="backlight_RIGHT"
        scale={0.05}
        position={[frameLength / 2 - 0.034, -0.055, - (frameWidth / 2 - 0.15)]}
        rotation={[0, - Math.PI / 2, 0]}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes3.BLACK.geometry}
                material={backLightMaterial}
                scale={[1.991, 1, 0.075]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes3.Zilver.geometry}
                material={backLightMaterial}
                position={[1.348, 0.657, -0.247]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[0.078, 0.023, 0.078]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes3.red3.geometry}
                material={redBackLightMaterial4}
                position={[-0.008, -0.303, -0.14]}
                rotation={[Math.PI / 2, 0, 0]}
                scale={[1, 0.113, 1]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes3.red.geometry}
                material={redBackLightMaterial3}
                position={[-1.279, 0, -0.126]}
                scale={[0.325, 1, 0.109]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes3.red2.geometry}
                material={redBackLightMaterial3}
                position={[1.271, 0, -0.126]}
                rotation={[-Math.PI, 0, 0]}
                scale={[-0.325, -1, -0.109]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes3.white.geometry}
                material={orangeBackLightMaterial4}
                position={[-1.279, 0, -0.126]}
                scale={[0.325, 1, 0.109]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes3.orange.geometry}
                material={whiteBackLightMaterial3}
                position={[1.268, 0, -0.126]}
                rotation={[-Math.PI, 0, 0]}
                scale={[-0.325, -1, -0.109]}
            />
        </group>

    

        <group
        name="side-flectors1"
        visible={frameLength > 1.3}>
            {/* <mesh
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
            /> */}
            <group scale={[0.05, 0.055, 0.055]}
            position={[- (frameLength/2 - reflectorX), plankHeight/2 + 0.025, - (frameWidth / 2 + 0.03)]}
            rotation={[0, Math.PI * 0.5, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes2.Cube.geometry}
                    material={backLightMaterial}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes2.Cube001.geometry}
                    material={orangeBackLightMaterial3}
                    position={[0.158, 0, 0]}
                    scale={[0.014, 0.429, 0.429]}
                />
            </group>
            <group scale={[0.05, 0.055, 0.055]}
            position={[- (frameLength/2 - reflectorX), plankHeight/2 + 0.025, (frameWidth / 2 + 0.03)]}
            rotation={[0, - Math.PI * 0.5, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes2.Cube.geometry}
                    material={backLightMaterial}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes2.Cube001.geometry}
                    material={orangeBackLightMaterial3}
                    position={[0.158, 0, 0]}
                    scale={[0.014, 0.429, 0.429]}
                />
            </group>
        </group>

        <group
        name="side-flectors2">
            {/* <mesh
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
            /> */}
             <group scale={[0.05, 0.055, 0.055]}
            position={[- (frameLength/2 - 0.23), plankHeight/2 + 0.025, - (frameWidth / 2 + 0.03)]}
            rotation={[0, Math.PI * 0.5, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes2.Cube.geometry}
                    material={backLightMaterial}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes2.Cube001.geometry}
                    material={orangeBackLightMaterial3}
                    position={[0.158, 0, 0]}
                    scale={[0.014, 0.429, 0.429]}
                />
            </group>
            <group scale={[0.05, 0.055, 0.055]}
            position={[- (frameLength/2 - 0.23), plankHeight/2 + 0.025, (frameWidth / 2 + 0.03)]}
            rotation={[0, - Math.PI * 0.5, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes2.Cube.geometry}
                    material={backLightMaterial}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes2.Cube001.geometry}
                    material={orangeBackLightMaterial3}
                    position={[0.158, 0, 0]}
                    scale={[0.014, 0.429, 0.429]}
                />
            </group>
        </group>

        <group
        name="wheel-flectors-back"
        position={ frameLength> 2.7 ? [0.299,0,0] : [-0.034,0,0]}>
            <mesh
                castShadow
                receiveShadow
                geometry={cylinderReflector}
                material={rubber}
                position={[0.385, -0.125, frameWidth / 2 + 0.15]}
                scale={[0.06, 0.02, 0.06]}
                rotation={[Math.PI / 2, 0, Math.PI / 2]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={cylinderReflector}
                material={redBackLightMaterial2}
                position={[0.385, -0.125, frameWidth / 2 + 0.15]}
                scale={[0.05, 0.05, 0.05]}
                rotation={[Math.PI / 2, 0, Math.PI / 2]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={cylinderReflector}
                material={rubber}
                position={[0.385, -0.125, -(frameWidth / 2 + 0.15)]}
                scale={[0.06, 0.02, 0.06]}
                rotation={[Math.PI / 2, 0, Math.PI / 2]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={cylinderReflector}
                material={redBackLightMaterial2}
                position={[0.385, -0.125, -(frameWidth / 2 + 0.15)]}
                scale={[0.05, 0.05, 0.05]}
                rotation={[Math.PI / 2, 0, Math.PI / 2]}
            />
        </group>
        <group
        name="wheel-flectors-front"
        rotation={[0, Math.PI, 0]}
        position={ frameLength> 2.7 ? [-0.258,0,0] : [0.033,0,0]}>
            <mesh
                castShadow
                receiveShadow
                geometry={cylinderReflector}
                material={rubber}
                position={[0.385, -0.125, frameWidth / 2 + 0.15]}
                scale={[0.06, 0.02, 0.06]}
                rotation={[Math.PI / 2, 0, Math.PI / 2]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={cylinderReflector}
                material={whiteBackLightMaterial2}
                position={[0.385, -0.125, frameWidth / 2 + 0.15]}
                scale={[0.05, 0.05, 0.05]}
                rotation={[Math.PI / 2, 0, Math.PI / 2]}
            />
             <mesh
                castShadow
                receiveShadow
                geometry={cylinderReflector}
                material={rubber}
                position={[0.385, -0.125, - (frameWidth / 2 + 0.15)]}
                scale={[0.06, 0.02, 0.06]}
                rotation={[Math.PI / 2, 0, Math.PI / 2]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={cylinderReflector}
                material={whiteBackLightMaterial2}
                position={[0.385, -0.125, - (frameWidth / 2 + 0.15)]}
                scale={[0.05, 0.05, 0.05]}
                rotation={[Math.PI / 2, 0, Math.PI / 2]}
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
useGLTF.preload(`${baseUrl}/models/reflectorSide.glb`)
useGLTF.preload(`${baseUrl}/models/backlights3.0.glb`)