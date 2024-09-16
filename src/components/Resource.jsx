import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Resource({ position, type, onHarvest }) {
  const [health, setHealth] = useState(100);
  const meshRef = useRef();

  const getResourceProperties = () => {
    switch (type) {
      case 'tree':
        return { geometry: new THREE.CylinderGeometry(0.5, 0.5, 5, 8), color: 'saddlebrown', harvestTime: 3 };
      case 'rock':
        return { geometry: new THREE.DodecahedronGeometry(1), color: 'gray', harvestTime: 5 };
      case 'bush':
        return { geometry: new THREE.SphereGeometry(0.7, 8, 8), color: 'green', harvestTime: 2 };
      default:
        return { geometry: new THREE.BoxGeometry(1, 1, 1), color: 'white', harvestTime: 1 };
    }
  };

  const { geometry, color, harvestTime } = getResourceProperties();

  const harvest = () => {
    setHealth(prevHealth => {
      const newHealth = prevHealth - (100 / harvestTime);
      if (newHealth <= 0) {
        onHarvest(type);
        return 0;
      }
      return newHealth;
    });
  };

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(health / 100);
    }
  });

  return (
    <mesh ref={meshRef} position={position} geometry={geometry} onClick={harvest}>
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default Resource;