import React from 'react';

const Item = ({ position }) => {
  return (
    <mesh position={position}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color='red' />
    </mesh>
  );
};

export default Item;
