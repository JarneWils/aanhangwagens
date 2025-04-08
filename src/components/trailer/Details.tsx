import useMeasurements from "../stores/useMeasurements"
import { useMemo, useEffect } from "react"
import * as THREE from 'three'
import React from "react"
import { useGLTF, useTexture } from "@react-three/drei"
import { baseUrl } from "../../global"
import { shallow } from "zustand/shallow"


export default function Details ()
{
    // LENGTH
    const {frameLength, frameWidth} = useMeasurements(
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
    const backLightTexture = useTexture({
        map: `${baseUrl}/textures/lights/backlight-diff.jpg`,
        normalMap: `${baseUrl}/textures/lights/backlight-norm.jpg`,
    })

    /**
     * MATERIALS
     */
    const metal = useMemo(() => {
        const mat = new THREE.MeshStandardMaterial({
            color: '#858585',
        })
        return mat
    }, [])

    const backLightMaterial = useMemo(() => {
        const mat = new THREE.MeshStandardMaterial({
            ...backLightTexture,
            color: '#ababab',
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
    const whiteBackLightMaterial = useMemo(() => {
        const mat = new THREE.MeshStandardMaterial({
            ...backLightTexture,
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
        position={[frameLength / 2 + 0.005, -0.1, frameWidth / 2 - 0.15]}
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
        position={[frameLength / 2 + 0.005, -0.1, - (frameWidth / 2 - 0.15)]}
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
        visible={frameLength > 1.4 && frameLength < 3 ? true : false}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube.geometry}
                material={orangeBackLightMaterial}
                position={[0.575, -0.02, frameWidth / 2 + 0.055]}
                scale={[0.025, 0.025, 0.1]}
                rotation={[0, 0, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube.geometry}
                material={orangeBackLightMaterial}
                position={[0.575, -0.02, - (frameWidth / 2 + 0.055)]}
                scale={[0.025, 0.025, 0.1]}
                rotation={[0, 0, 0]}
            />
        </group>

        <group
        name="side-flectors2"
        visible={frameLength > 1.4 && frameLength < 3 ? true : false}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube.geometry}
                material={orangeBackLightMaterial}
                position={[-0.6, -0.02, frameWidth / 2 + 0.055]}
                scale={[0.025, 0.025, 0.1]}
                rotation={[0, 0, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube.geometry}
                material={orangeBackLightMaterial}
                position={[-0.6, -0.02, - (frameWidth / 2 + 0.055)]}
                scale={[0.025, 0.025, 0.1]}
                rotation={[0, 0, 0]}
            />
        </group>

        <group
        name="wheel-flectors-back"
        position={ frameLength>3 ? [0.385,0,0] : [0,0,0]}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube.geometry}
                material={backLightMaterial}
                position={[0.38, -0.13, frameWidth / 2 + 0.15]}
                scale={[0.03, 0.03, 0.1]}
                rotation={[0, -Math.PI * 0.5, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube.geometry}
                material={redBackLightMaterial}
                position={[0.385, -0.125, frameWidth / 2 + 0.15]}
                scale={[0.025, 0.025, 0.1]}
                rotation={[0, -Math.PI * 0.5, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube.geometry}
                material={backLightMaterial}
                position={[0.38, -0.13, - (frameWidth / 2 + 0.15)]}
                scale={[0.03, 0.03, 0.1]}
                rotation={[0, -Math.PI * 0.5, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube.geometry}
                material={redBackLightMaterial}
                position={[0.385, -0.125, - (frameWidth / 2 + 0.15)]}
                scale={[0.025, 0.025, 0.1]}
                rotation={[0, -Math.PI * 0.5, 0]}
            />
        </group>
        <group
        name="wheel-flectors-front"
        rotation={[0, Math.PI, 0]}
        position={ frameLength>3 ? [-0.385,0,0] : [0,0,0]}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube.geometry}
                material={backLightMaterial}
                position={[0.38, -0.13, frameWidth / 2 + 0.15]}
                scale={[0.03, 0.03, 0.1]}
                rotation={[0, -Math.PI * 0.5, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube.geometry}
                material={whiteBackLightMaterial}
                position={[0.385, -0.125, frameWidth / 2 + 0.15]}
                scale={[0.025, 0.025, 0.1]}
                rotation={[0, -Math.PI * 0.5, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube.geometry}
                material={backLightMaterial}
                position={[0.38, -0.13, - (frameWidth / 2 + 0.15)]}
                scale={[0.03, 0.03, 0.1]}
                rotation={[0, -Math.PI * 0.5, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube.geometry}
                material={whiteBackLightMaterial}
                position={[0.385, -0.125, - (frameWidth / 2 + 0.15)]}
                scale={[0.025, 0.025, 0.1]}
                rotation={[0, -Math.PI * 0.5, 0]}
            />
        </group>
    </>
}