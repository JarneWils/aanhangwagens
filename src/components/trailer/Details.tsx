import useMeasurements from "../stores/useMeasurements"
import { useMemo, useEffect } from "react"
import * as THREE from 'three'
import React from "react"
import { useGLTF, useTexture } from "@react-three/drei"
import { baseUrl } from "../../global"
import { shallow } from "zustand/shallow"
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js"


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
      

    /**
     * MATERIALS
     */
    const metal = useMemo(() => {
        const mat = new THREE.MeshStandardMaterial({
            color: '#ababb5',
            roughness: 0.2,
            metalness: 0.9,
        })
        return mat
    }, [])

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
            color: '#ee0000',
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
        const geo = new RoundedBoxGeometry(3, 1.5, 0.07, 8, 16)
        return new THREE.Mesh(geo)
    },[])
    /**
     * MODEL
     */
    const { nodes} = useGLTF(`${baseUrl}/models/backlights.glb`) as any


    /**
     * DISPOSE
     */
    useEffect(()=>{
        return () => {
            metal.dispose()
            tube.dispose()
        };
    }, [metal, tube])


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
        position={[frameLength / 2 - 0.025, -0.1, frameWidth / 2 - 0.15]}
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
        position={[frameLength / 2 - 0.025, -0.1, - (frameWidth / 2 - 0.15)]}
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
    </>
}