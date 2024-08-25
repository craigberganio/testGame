import React from 'react'
import { usePlane } from '@react-three/cannon'

function Terrain() {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], position: [0, 0, 0] }))

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#4caf50" />
    </mesh>
  )
}

export default Terrain