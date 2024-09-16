import React, { useMemo } from 'react'

import { createNoise2D } from 'simplex-noise';

import * as THREE from 'three';

  

function Tree({ position }) {

  const treeHeight = 8 + Math.random() * 4;

  const trunkRadius = 0.4 + Math.random() * 0.2;

  return (

    <group position={position}>

      {/* Trunk */}

      <mesh position={[0, treeHeight / 2, 0]} castShadow>

        <cylinderGeometry args={[trunkRadius, trunkRadius, treeHeight, 8]} />

        <meshStandardMaterial color="#8B4513" />

      </mesh>

      {/* Foliage */}

      <mesh position={[0, treeHeight, 0]} castShadow>

        <sphereGeometry args={[2 + Math.random(), 8, 8]} />

        <meshStandardMaterial color="#228B22" />

      </mesh>

    </group>

  )

}

  

function Rock({ position, scale }) {

  const geometry = useMemo(() => {

    const geo = new THREE.SphereGeometry(1, 7, 7);

    const noise = createNoise2D();

    const pos = geo.attributes.position;

    const vec = new THREE.Vector3();

    for (let i = 0; i < pos.count; i++) {

      vec.fromBufferAttribute(pos, i);

      const noise_val = noise(vec.x * 2, vec.y * 2, vec.z * 2) * 0.3;

      vec.add(vec.clone().normalize().multiplyScalar(noise_val));

      pos.setXYZ(i, vec.x, vec.y, vec.z);

    }

    geo.computeVertexNormals();

    return geo;

  }, []);

  

  return (

    <mesh position={position} scale={scale} castShadow>

      <bufferGeometry {...geometry} />

      <meshStandardMaterial color="#808080" roughness={0.8} />

    </mesh>

  )

}

  

function Environment({ heightMap }) {

  const noise2D = createNoise2D();

  

  const elements = useMemo(() => {

    const items = []

    for (let i = 0; i < 500; i++) {

      const x = (Math.random() - 0.5) * 1000

      const z = (Math.random() - 0.5) * 1000

      const y = heightMap ? getTerrainHeight(x, z, heightMap) : 0

  

      if (Math.random() < 0.7) {

        items.push(<Tree key={`tree-${i}`} position={[x, y, z]} />)

      } else {

        const scale = 2 + Math.random() * 3

        items.push(<Rock key={`rock-${i}`} position={[x, y, z]} scale={scale} />)

      }

    }

    return items

  }, [heightMap])

  

  return <>{elements}</>

}

  

function getTerrainHeight(x, z, heightMap) {

  const size = Math.sqrt(heightMap.length);

  const terrainX = Math.round((x + 500) * (size - 1) / 1000);

  const terrainZ = Math.round((z + 500) * (size - 1) / 1000);

  const index = terrainZ * size + terrainX;

  return heightMap[index]?.y || 0;

}

  

export default Environment