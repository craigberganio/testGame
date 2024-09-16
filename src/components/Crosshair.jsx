import React from 'react';

const Crosshair = () => {
  const crosshairStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '20px',
    height: '20px',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
  };

  const lineStyle = {
    position: 'absolute',
    backgroundColor: 'white',
  };

  const horizontalLineStyle = {
    ...lineStyle,
    width: '100%',
    height: '2px',
    top: '50%',
    transform: 'translateY(-50%)',
  };

  const verticalLineStyle = {
    ...lineStyle,
    width: '2px',
    height: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
  };

  return (
    <div style={crosshairStyle}>
      <div style={horizontalLineStyle}></div>
      <div style={verticalLineStyle}></div>
    </div>
  );
};

export default Crosshair;