import React from 'react';


export default function Loading() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 w-100 bg-black">
      
      {/* Spinner */}
      <div className="position-relative">
        <div
          className="rounded-circle"
          style={{
            width: '64px',
            height: '64px',
            border: '4px solid #343a40',
          }}
        ></div>
        
        <div
          className="position-absolute top-0 start-0 rounded-circle spinner-custom"
          style={{
            width: '64px',
            height: '64px',
            border: '4px solid #dc3545',
            borderTopColor: 'transparent',
          }}
        ></div>
      </div>

      {/* Text */}
      <p className="mt-4 text-secondary text-uppercase pulse-custom" style={{ letterSpacing: '2px', fontSize: '0.9rem' }}>
        Loading cinema experience...
      </p>

      {/* Dots */}
      <div className="mt-3 d-flex gap-1">
        <span className="rounded-circle bg-danger bounce-custom" style={{ width: '8px', height: '8px', animationDelay: '-0.3s' }}></span>
        <span className="rounded-circle bg-danger bounce-custom" style={{ width: '8px', height: '8px', animationDelay: '-0.15s' }}></span>
        <span className="rounded-circle bg-danger bounce-custom" style={{ width: '8px', height: '8px' }}></span>
      </div>

    </div>
  );
}
