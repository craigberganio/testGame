import React, { useMemo, useRef, useEffect } from 'react'

import { createNoise2D } from 'simplex-noise';

import * as THREE from 'three';

  

function Terrain({ onTerrainGenerated }) {

  const meshRef = useRef();

  const noise2D = useMemo(() => createNoise2D(), []);

  

  const terrain = useMemo(() => {

    const size = 1000;

    const segments = 128;

    const geometry = new THREE.PlaneGeometry(size, size, segments, segments);

    const positions = geometry.attributes.position.array;

    const heightMap = [];

  

    for (let i = 0; i < positions.length; i += 3) {

      const x = positions[i];

      const z = positions[i + 2];

      const elevation = noise2D(x * 0.002, z * 0.002) * 30;

      positions[i + 1] = elevation;

      heightMap.push({ x, y: elevation, z });

    }

  

    geometry.computeVertexNormals();

    return { geometry, heightMap };

  }, [noise2D]);

  

  useEffect(() => {

    onTerrainGenerated(terrain.heightMap);

  }, [terrain, onTerrainGenerated]);

  

  return (

    <mesh ref={meshRef} geometry={terrain.geometry} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>

      <meshStandardMaterial color="green" side={THREE.DoubleSide} wireframe={true} />

    </mesh>

  );

}

  

export default Terrain;