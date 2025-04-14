import { useMemo, useEffect } from 'react';
import { RoundedBoxGeometry } from 'three-stdlib';
import useNormalBasedCubeUVs from './useNormalBasedCubeUvs'; // Pas aan naar jouw pad

export function useSpecialGeometry(
  length: number,
  height: number,
  width: number,
  segments: number,
  radius: number
) {
  const geometry = useMemo(() => {
    const geo = new RoundedBoxGeometry(length, height, width, segments, radius);
    return geo;
  }, [length, height, width, segments, radius]);

  useNormalBasedCubeUVs(geometry);

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  return geometry;
}