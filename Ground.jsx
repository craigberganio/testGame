import React from 'react';

const Ground = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeBufferGeometry args={[20, 20]} />
      <meshStandardMaterial color='green' />
    </mesh>
  );
};

export default Ground;
