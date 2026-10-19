import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '50vh',
      width: '100%'
    }}>
      <RotatingLines
        visible={true}
        height="96"
        width="96"
        strokeColor="#febd69"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-line-loading"
      />
    </div>
  );
};

export default Loader;