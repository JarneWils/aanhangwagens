import { useEffect } from 'react';
import * as THREE from 'three';
import { Vector3 } from 'three';

function useNormalBasedCubeUVs(geometry: THREE.BufferGeometry) {
    useEffect(() => {
        // Zorg ervoor dat we normaalwaarden hebben
        if (!geometry.attributes.normal) {
            geometry.computeVertexNormals();
        }

        const positions = geometry.attributes.position.array;
        const normals = geometry.attributes.normal.array;
        const uvs = new Float32Array((positions.length / 3) * 2);
        const localPos = new Vector3();
        const localNormal = new Vector3();

        for (let i = 0; i < positions.length; i += 3) {
            localPos.set(positions[i], positions[i + 1], positions[i + 2]);
            localNormal.set(normals[i], normals[i + 1], normals[i + 2]);
            const x = localPos.x;
            const y = localPos.y;
            const z = localPos.z;
            const nx = Math.abs(localNormal.x);
            const ny = Math.abs(localNormal.y);
            const nz = Math.abs(localNormal.z);
            const uvIndex = (i / 3) * 2;

            if (nx >= ny && nx >= nz) {
                uvs[uvIndex] = z;
                uvs[uvIndex + 1] = y;
            } else if (ny >= nx && ny >= nz) {
                uvs[uvIndex] = x;
                uvs[uvIndex + 1] = z;
            } else {
                uvs[uvIndex] = x;
                uvs[uvIndex + 1] = y;
            }
        }

        geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    }, [geometry]);
}

export default useNormalBasedCubeUVs;
