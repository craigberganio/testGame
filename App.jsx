import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Player from './components/Player';
import Item from './components/Item';
import Ground from './components/Ground';

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const generateItems = () => {
      const newItems = [];
      for (let i = 0; i < 10; i++) {
        newItems.push({
          id: i,
          position: [Math.random() * 20 - 10, 0.5, Math.random() * 20 - 10],
        });
      }
      setItems(newItems);
    };
    generateItems();
  }, []);

  return (
    <Canvas camera={{ position: [0, 5, 10] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Player />
      <Ground />
      {items.map((item) => (
        <Item key={item.id} position={item.position} />
      ))}
      <OrbitControls />
    </Canvas>
  );
};

export default App;
