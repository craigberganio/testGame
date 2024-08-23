import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';

const Player = () => {
  const playerRef = useRef();
  const speed = 0.1;

  const [direction, setDirection] = useState({ x: 0, z: 0 });

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowUp':
          setDirection({ x: 0, z: -1 });
          break;
        case 'ArrowDown':
          setDirection({ x: 0, z: 1 });
          break;
        case 'ArrowLeft':
          setDirection({ x: -1, z: 0 });
          break;
        case 'ArrowRight':
          setDirection({ x: 1, z: 0 });
          break;
        default:
          break;
      }
    };

    const handleKeyUp = () => {
      setDirection({ x: 0, z: 0 });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame(() => {
    playerRef.current.position.x += direction.x * speed;
    playerRef.current.position.z += direction.z * speed;
  });

  return (
    <mesh ref={playerRef} position={[0, 0.5, 0]}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color='blue' />
    </mesh>
  );
};

export default Player;
