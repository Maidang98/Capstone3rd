import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMovieUpload } from './slice';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from 'antd';

export default function AddNew() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    tenPhim: '',       
    trailer: '',
    moTa: '',          
    ngayKhoiChieu: '',  
    dangChieu: false,   
    sapChieu: false,   
    hot: false,
    danhGia: 0,        
    hinhAnh: null,     
    maNhom: 'GP01'    
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMovie((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleChangeFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setMovie((prev) => ({
        ...prev,
        hinhAnh: file
      }));
    }
  };

  const handleDateChange = (date, dateString) => {
    setMovie((prev) => ({
      ...prev,
      ngayKhoiChieu: dateString 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(movie).forEach(([key, value]) => {
      if (key === 'hinhAnh') {
        if (value) {
          formData.append('File', value, value.name);
        }
      } else {
        formData.append(key, value);
      }
    });

    dispatch(addMovieUpload(formData))
      .unwrap()
      .then(() => {
        alert('Movie added successfully!');
        navigate('/admin/films');
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="mx-auto p-4 p-md-5 bg-black border border-secondary shadow-lg rounded-4 fade-in" style={{ maxWidth: "720px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom border-secondary pb-3">
        <div className="d-flex align-items-center gap-3">
          <div
            className="d-flex align-items-center justify-content-center bg-success bg-opacity-25 text-success rounded-3"
            style={{ width: "40px", height: "40px" }}
          >
            <i className="fa-solid fa-video"></i>
          </div>

          <h2 className="fs-2 fw-bold text-danger text-uppercase mb-0">
            Add New Movie
          </h2>
        </div>

        <button
          type="button"
          className="btn btn-outline-light rounded-pill px-3"
          onClick={() => navigate(-1)}
        >
          <i className="fa-solid fa-arrow-left me-2"></i>
          Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        <div>
          <label className="form-label fw-bold small text-white">Movie Title</label>
          <input name="tenPhim" placeholder="🎬Enter movie title..." className="form-control bg-dark text-white border border-secondary rounded-3" onChange={handleChange} />
        </div>

        <div>
          <label className="form-label fw-bold small text-white">Trailer Link</label>
          <input name="trailer" placeholder="https://youtube.com/watch?v=..." className="form-control bg-dark text-white border border-secondary rounded-3" onChange={handleChange} />
        </div>

        <div>
          <label className="form-label fw-bold small text-white">Detailed Description</label>
          <textarea name="moTa" placeholder="Write a short description about the movie..." rows={4} className="form-control bg-dark text-white border border-secondary rounded-3" onChange={handleChange}></textarea>
        </div>

        <div>
          <label className="form-label fw-bold small text-white">Release Date</label>
          <DatePicker format="DD/MM/YYYY" placeholder="Select release date" className="w-100" onChange={handleDateChange} />
        </div>
        <div>
          <label className="form-label fw-bold small text-white">
              Movie Rating
          </label>

          <input
              type="number"
              name="danhGia"
              min="1"
              max="10"
              placeholder="1 - 10"
              className="form-control bg-dark text-white border border-secondary rounded-3"
              onChange={handleChange}
          />
      </div>
      <div>
          <label className="form-label fw-bold small text-white">
              Group
          </label>

          <select
              name="maNhom"
              className="form-select bg-dark text-white border border-secondary"
              value={movie.maNhom}
              onChange={handleChange}
          >
              <option value="GP01">GP01</option>
              <option value="GP02">GP02</option>
              <option value="GP03">GP03</option>
              <option value="GP04">GP04</option>
              <option value="GP05">GP05</option>
          </select>
      </div>

        <div className="d-flex gap-4 p-3 bg-dark border border-secondary rounded-3">
          <label className="form-check-label text-light">
            <input type="checkbox" name="dangChieu" className="form-check-input me-2" onChange={handleChange} /> 
            Now Showing <i className="fa-solid fa-film text-warning"></i>
          </label>

          <label className="form-check-label text-light">
            <input type="checkbox" name="hot" className="form-check-input me-2" onChange={handleChange} /> 
            Hot Blockbusters <i className="fa-solid fa-fire text-warning"></i>
          </label>
          <label className="form-check-label text-light">
            <input type="checkbox" name="sapChieu" className="form-check-input me-2" onChange={handleChange} /> 
            Coming Soon <i className="fa-solid fa-clapperboard text-warning"></i>
          </label>
        </div>

        <div>
            <label className="form-label fw-bold small text-white">
              Poster Image
            </label>

            <input
              type="file"
              accept="image/*"
              className="form-control text-muted"
              onChange={handleChangeFile}
            />

            {/* Preview Image */}
            {movie.hinhAnh && (
              <div className="text-center mt-3">
                <img
                  src={URL.createObjectURL(movie.hinhAnh)}
                  alt="preview"
                  placeholder="Choose an image..."
                  className="img-fluid rounded border border-secondary shadow"
                  style={{
                    width: "220px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 fw-bold text-uppercase mt-3"
          >
            <i className="fa-solid fa-cloud-arrow-up me-2"></i>
            Save New Movie
          </button>
      </form>
    </div>
  );
}
