import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Sky } from '@react-three/drei'
import { Physics } from '@react-three/cannon'

import Character from './Character'
import Terrain from './Terrain'
import Objects from './Objects'

function GameWorld() {
  return (
    <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
      <Suspense fallback={null}>
      <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.3} />
        <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
        <Physics>
          <Character />
          <Terrain />
          <Objects />
        </Physics>
      </Suspense>
    </Canvas>
  )
}

export default GameWorld