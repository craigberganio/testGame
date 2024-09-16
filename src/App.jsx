import React, { useState, useEffect } from 'react'

import { Canvas } from '@react-three/fiber'

import Terrain from './components/Terrain'

import Environment from './components/Environment'

import Player from './components/Player'

import ErrorBoundary from './components/ErrorBoundary'

import './App.css'

  

export default function App() {

  const [heightMap, setHeightMap] = useState(null)

  

  const handleTerrainGenerated = (generatedHeightMap) => {

    setHeightMap(generatedHeightMap)

  }

  

  return (

    <div style={{ width: '100vw', height: '100vh' }}>

      <ErrorBoundary>

        <Canvas shadows camera={{ fov: 75, near: 0.1, far: 1000 }}>

          <ambientLight intensity={0.5} />

          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

          <Terrain onTerrainGenerated={handleTerrainGenerated} />

          {heightMap && (

            <>

              <Environment heightMap={heightMap} />

              <Player heightMap={heightMap} />

            </>

          )}

        </Canvas>

      </ErrorBoundary>

    </div>

  )

}