import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function DayNightCycle() {
  const lightRef = useRef();
  const dayDuration = 600; // 10 minutes in seconds

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const dayProgress = (elapsedTime % dayDuration) / dayDuration;
    const angle = dayProgress * Math.PI * 2;

    // Update light position
    lightRef.current.position.x = Math.cos(angle) * 100;
    lightRef.current.position.y = Math.sin(angle) * 100;

    // Update light color and intensity
    if (dayProgress > 0.25 && dayProgress < 0.75) {
      // Daytime
      lightRef.current.color.setHex(0xffffff);
      lightRef.current.intensity = 1;
    } else {
      // Night time
      lightRef.current.color.setHex(0x2233ff);
      lightRef.current.intensity = 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight ref={lightRef} position={[0, 100, 0]} castShadow />
    </>
  );
}

export default DayNightCycle;