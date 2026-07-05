import React from 'react';
import { Link } from "react-router-dom";

export default function Movie({ movie }) {

  const handleImageError = (e) => {
    e.target.src = "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/0a/63/01/0a63013d-596a-73d8-5b12-426b38c22f0d/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg"; 
  };

  return (
    <div className="card bg-black border border-secondary rounded-3 shadow-lg h-100 position-relative overflow-hidden">
      
      {/* IMAGE */}
      <div className="position-relative" style={{aspectRatio:"2/3", backgroundColor:"#0f0f0f"}}>
        <img
          className="w-100 h-100 object-fit-cover"
          src={movie.hinhAnh}
          alt={movie.tenPhim}
          loading="lazy"
          onError={handleImageError}
        />

        {/* gradient overlay */}
        <div className="position-absolute top-0 start-0 w-100 h-100" 
             style={{background:"linear-gradient(to top, #0f0f0f, rgba(24,24,24,0.2), transparent)"}}>
        </div>

        {/* hover button (desktop only) */}
        <div className="d-none d-lg-flex position-absolute top-0 start-0 w-100 h-100 bg-black bg-opacity-50 opacity-0 hover-opacity-100 transition d-flex align-items-center justify-content-center backdrop-blur z-2">
          <Link 
            to={`/detail/${movie.maPhim}`}
            className="btn btn-danger fw-bold text-uppercase shadow-sm"
          >
            Book Tickets Now
          </Link>
        </div>

        {/* rating + age */}
        <div className="position-absolute top-0 end-0 p-2 d-flex flex-column align-items-end gap-1 z-1">
          <div className="badge bg-black text-warning border border-secondary">
            ★ {movie.danhGia}
          </div>
          <div className="badge bg-danger text-white text-uppercase">
          PG-18
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="card-body d-flex flex-column gap-2">
        {/* TITLE */}
        <h5 className="card-title text-white text-uppercase fw-bold text-truncate" title={movie.tenPhim}>
          {movie.tenPhim}
        </h5>

        {/* DESCRIPTION */}
        <p
          className="card-text text-secondary small flex-grow-1"
          style={{
            minHeight: "4.5rem",   // ép chiều cao tối thiểu
            maxHeight: "4.5rem",   // giới hạn chiều cao tối đa
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {movie.moTa || "Movie description is being updated..."}
        </p>



        {/* BUTTON MOBILE */}
        <div className="mt-auto d-lg-none">
          <Link 
            to={`/detail/${movie.maPhim}`}
            className="btn btn-black w-100 fw-bold text-uppercase d-flex align-items-center justify-content-center gap-2"
          >
            Book Tickets
            <svg className="bi bi-arrow-right" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.498.498 0 0 1 .146.354.498.498 0 0 1-.146.354l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
            </svg>
          </Link>
        </div>
        {/* NEW BUTTON VIEW DETAIL */}
          <div className="mt-2">
            <Link 
              to={`/detail/${movie.maPhim}`}
              className="btn btn-danger w-100 fw-bold text-uppercase d-flex align-items-center justify-content-center gap-2"
            >
              View Detail
              <i className="fa-solid fa-circle-info"></i>
            </Link>
          </div>
      </div>
    </div>
  );
}
