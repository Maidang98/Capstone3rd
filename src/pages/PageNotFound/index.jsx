import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-dark text-center position-relative p-4">
      
      {/* 404 effect block */}
      <div className="position-relative">
        <h1 className="fw-bold text-dark" style={{fontSize:"8rem",letterSpacing:"-0.05em"}}>
          404
        </h1>
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
          <div className="position-relative">
            <i className="fa-solid fa-film text-danger display-3"></i>
            <div className="position-absolute top-50 start-50 translate-middle w-100" style={{height:"2px",backgroundColor:"#111",transform:"rotate(45deg)"}}></div>
          </div>
        </div>
      </div>

      {/* Notification content */}
      <div className="mt-n4 position-relative z-1">
        <h2 className="fw-bold text-white">Oops! Signal lost...</h2>
        <p className="text-secondary mx-auto" style={{maxWidth:"32rem"}}>
          It seems the information you are looking for has been canceled or does not exist in our <span className="fw-bold text-white fst-italic">BC92<span className="text-danger">MOVIE</span></span> system.
        </p>

        {/* Navigation buttons */}
        <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center gap-3 pt-4">
          <button 
            onClick={() => navigate(-1)}
            className="btn btn-outline-secondary d-flex align-items-center gap-2"
          >
            <i className="fa-solid fa-arrow-left-long"></i> Go Back
          </button>
          
          <NavLink 
            to="/"
            className="btn btn-danger d-flex align-items-center gap-2"
          >
            <i className="fa-solid fa-house"></i> Home Page
          </NavLink>
        </div>
      </div>

      {/* Background blur effect */}
      <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-75"></div>
    </div>
  );
}
