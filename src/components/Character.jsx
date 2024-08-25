import React, { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useSphere } from '@react-three/cannon'
import { Vector3 } from 'three'

const SPEED = 5
const keys = { KeyW: 'forward', KeyS: 'backward', KeyA: 'left', KeyD: 'right', Space: 'jump' }
const moveFieldByKey = (key) => keys[key]
const direction = new Vector3()
const frontVector = new Vector3()
const sideVector = new Vector3()
const rotation = new Vector3()

function Character() {
  const { camera } = useThree()
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0, 10, 0],
  }))
  const velocity = useRef([0, 0, 0])
  useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), [api.velocity])

  const [, getWorldPosition] = useThree((state) => [state.scene, state.camera.getWorldPosition])

  useFrame((state) => {
    ref.current.getWorldPosition(rotation)
    frontVector.set(0, 0, Number(moveState.backward) - Number(moveState.forward))
    sideVector.set(Number(moveState.left) - Number(moveState.right), 0, 0)
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(state.camera.rotation)
    api.velocity.set(direction.x, velocity.current[1], direction.z)
    if (moveState.jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05) api.velocity.set(velocity.current[0], 10, velocity.current[2])
    camera.position.set(rotation.x, rotation.y + 5, rotation.z + 10)
  })

  return (
    <mesh ref={ref} castShadow>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  )
}

export default Character

const moveState = {}
window.addEventListener('keydown', (e) => moveState[moveFieldByKey(e.code)] = true)
window.addEventListener('keyup', (e) => moveState[moveFieldByKey(e.code)] = false)