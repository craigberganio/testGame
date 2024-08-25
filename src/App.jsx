import React, { useState } from 'react'
import GameWorld from './components/GameWorld'

function App() {
  const [score, setScore] = useState(0)

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div style={{ position: 'absolute', top: 10, left: 10, color: 'white', fontSize: '20px' }}>
        Score: {score}
      </div>
      <GameWorld />
    </div>
  )
}

export default App