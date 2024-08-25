import React, { useState, useEffect } from 'react'
import { useBox } from '@react-three/cannon'

function Object({ position }) {
  const [ref] = useBox(() => ({
    mass: 1,
    position,
    args: [1, 1, 1],
  }))

  return (
    <mesh ref={ref} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}

function Objects() {
  const [objects, setObjects] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      setObjects(prev => [
        ...prev,
        {
          id: Math.random(),
          position: [
            Math.random() * 20 - 10,
            5,
            Math.random() * 20 - 10
          ]
        }
      ])
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {objects.map(obj => (
        <Object key={obj.id} position={obj.position} />
      ))}
    </>
  )
}

export default Objects