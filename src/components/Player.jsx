import React, { useRef, useEffect, useState } from 'react'

import { useFrame, useThree } from '@react-three/fiber'

import * as THREE from 'three'

import { Html, useHelper } from '@react-three/drei'

  

function Player({ heightMap, environment }) {

  const playerRef = useRef()

  const cameraRigRef = useRef()

  const { camera, scene } = useThree()

  const moveSpeed = 0.1

  const jumpForce = 0.15

  const gravity = -0.005

  const [keys, setKeys] = useState({ w: false, a: false, s: false, d: false, ' ': false, shift: false })

  const [velocity, setVelocity] = useState(new THREE.Vector3())

  const [isGrounded, setIsGrounded] = useState(false)

  const [stamina, setStamina] = useState(100)

  const [cameraAngle, setCameraAngle] = useState(new THREE.Euler(0, 0, 0, 'YXZ'))

  const [cameraDistance, setCameraDistance] = useState(5)

  

  const raycaster = new THREE.Raycaster()

  

  useEffect(() => {

    const handleKeyDown = (e) => setKeys(prev => ({ ...prev, [e.key.toLowerCase()]: true }))

    const handleKeyUp = (e) => setKeys(prev => ({ ...prev, [e.key.toLowerCase()]: false }))

    const handleMouseMove = (e) => {

      setCameraAngle(angle => new THREE.Euler(

        Math.max(-Math.PI / 2, Math.min(Math.PI / 2, angle.x - e.movementY * 0.002)),

        angle.y - e.movementX * 0.002,

        0,

        'YXZ'

      ))

    }

    const handleWheel = (e) => {

      setCameraDistance(dist => Math.max(2, Math.min(10, dist + e.deltaY * 0.01)))

    }

  

    window.addEventListener('keydown', handleKeyDown)

    window.addEventListener('keyup', handleKeyUp)

    document.addEventListener('mousemove', handleMouseMove)

    window.addEventListener('wheel', handleWheel)

  

    return () => {

      window.removeEventListener('keydown', handleKeyDown)

      window.removeEventListener('keyup', handleKeyUp)

      document.removeEventListener('mousemove', handleMouseMove)

      window.removeEventListener('wheel', handleWheel)

    }

  }, [])

  

  const getTerrainHeight = (x, z) => {

    if (!heightMap || heightMap.length === 0) return 0;

    const size = Math.sqrt(heightMap.length);

    const terrainX = Math.round((x + 500) * (size - 1) / 1000);

    const terrainZ = Math.round((z + 500) * (size - 1) / 1000);

    const index = Math.max(0, Math.min(heightMap.length - 1, terrainZ * size + terrainX));

    return heightMap[index]?.y || 0;

  }

  

  const checkCollision = (position, direction) => {

    const rayStart = position.clone().add(new THREE.Vector3(0, 0.5, 0))

    raycaster.set(rayStart, direction.normalize())

    const intersects = raycaster.intersectObjects(scene.children, true)

    return intersects.length > 0 && intersects[0].distance < 0.5

  }

  

  useFrame((state, delta) => {

    if (!playerRef.current || !cameraRigRef.current) return

  

    const playerRotation = new THREE.Euler(0, cameraAngle.y, 0, 'YXZ')

    playerRef.current.setRotationFromEuler(playerRotation)

  

    const moveDirection = new THREE.Vector3()

  

    if (keys.w) moveDirection.z -= 1

    if (keys.s) moveDirection.z += 1

    if (keys.a) moveDirection.x -= 1

    if (keys.d) moveDirection.x += 1

  

    moveDirection.applyEuler(playerRotation).normalize().multiplyScalar(moveSpeed * delta * 60)

    if (keys.shift && stamina > 0) {

      moveDirection.multiplyScalar(1.5)

      setStamina(Math.max(0, stamina - 0.5))

    } else {

      setStamina(Math.min(100, stamina + 0.1))

    }

  

    setVelocity(v => v.add(new THREE.Vector3(0, gravity * delta * 60, 0)))

  

    if (keys[' '] && isGrounded && stamina > 10) {

      setVelocity(v => v.add(new THREE.Vector3(0, jumpForce, 0)))

      setIsGrounded(false)

      setStamina(stamina - 10)

    }

  

    const newPosition = playerRef.current.position.clone()

    // Check collision in X direction

    if (!checkCollision(newPosition, new THREE.Vector3(moveDirection.x, 0, 0))) {

      newPosition.x += moveDirection.x

    }

    // Check collision in Z direction

    if (!checkCollision(newPosition, new THREE.Vector3(0, 0, moveDirection.z))) {

      newPosition.z += moveDirection.z

    }

  

    newPosition.add(velocity.clone().multiplyScalar(delta * 60))

  

    const terrainHeight = getTerrainHeight(newPosition.x, newPosition.z)

    if (newPosition.y < terrainHeight + 1) {

      newPosition.y = terrainHeight + 1

      setVelocity(v => new THREE.Vector3(v.x, 0, v.z))

      setIsGrounded(true)

    } else {

      setIsGrounded(false)

    }

  

    playerRef.current.position.copy(newPosition)

  

    // Update camera rig position

    cameraRigRef.current.position.copy(newPosition)

    cameraRigRef.current.setRotationFromEuler(cameraAngle)

  

    // Calculate camera position

    const cameraOffset = new THREE.Vector3(0, 2, cameraDistance)

    cameraOffset.applyEuler(cameraAngle)

    const cameraPosition = newPosition.clone().add(cameraOffset)

  

    // Check for obstacles between player and camera

    raycaster.set(newPosition, cameraOffset.clone().normalize())

    const intersects = raycaster.intersectObjects(scene.children, true)

    if (intersects.length > 0 && intersects[0].distance < cameraDistance) {

      cameraPosition.copy(intersects[0].point)

    }

  

    camera.position.lerp(cameraPosition, 0.1)

    camera.lookAt(newPosition.clone().add(new THREE.Vector3(0, 1, 0)))

  })

  

  return (

    <group>

      <mesh ref={playerRef} position={[0, 5, 0]}>

        <capsuleGeometry args={[0.5, 1, 4, 8]} />

        <meshStandardMaterial color="blue" />

      </mesh>

      <group ref={cameraRigRef} />

      <Html fullscreen>

        <div style={{ position: 'absolute', bottom: 20, left: 20, color: 'white' }}>

          Stamina: {Math.round(stamina)}

        </div>

      </Html>

    </group>

  )

}

  

export default Player