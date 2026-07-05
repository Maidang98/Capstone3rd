import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateMovieUpload } from './slice';
import { DatePicker } from 'antd'; 
import dayjs from 'dayjs'; 

export default function Edit() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { listMovie } = useSelector((state) => state.filmsReducer);
  const movieEdit = listMovie.find(item => item.maPhim == id);

  const [movie, setMovie] = useState({
    maPhim: '', tenPhim: '', trailer: '', moTa: '',
    ngayKhoiChieu: '', dangChieu: false,
    sapChieu: false, hot: false, danhGia: 0,
    maNhom: 'GP01', hinhAnh: null
  });

  useEffect(() => {
    if (movieEdit) {
      setMovie({
        ...movieEdit,
        ngayKhoiChieu: dayjs(movieEdit.ngayKhoiChieu, 'YYYY-MM-DD'),
        hinhAnh: null,
      });
    }
  }, [movieEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMovie({ ...movie, [name]: type === 'checkbox' ? checked : value });
  };

  const handleChangeDate = (date) => {
    setMovie({ ...movie, ngayKhoiChieu: date });
  };

  const handleChangeFile = (e) => {
    setMovie({ ...movie, hinhAnh: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!movie.maPhim) {
      alert("Movie ID not found for update!");
      return;
    }

    let formData = new FormData();
    formData.append('maPhim', movie.maPhim);

    for (let key in movie) {
      if (key === 'maPhim') continue;
      if (key === 'hinhAnh') {
        if (movie.hinhAnh instanceof File) {
          formData.append('File', movie.hinhAnh, movie.hinhAnh.name);
        }
      } else if (key === 'ngayKhoiChieu') {
        const dateFormatted = dayjs(movie.ngayKhoiChieu).format('DD/MM/YYYY');
        formData.append('ngayKhoiChieu', dateFormatted);
      
      } else if (key === 'dangChieu' || key === 'sapChieu' || key === 'hot') {
        formData.append(key, movie[key] ? 1 : 0);
    
      } else if (key === 'maNhom') {
        formData.append('maNhom', movie.maNhom);
      } else {
        formData.append(key, movie[key]);
      }
    }

    dispatch(updateMovieUpload(formData))
      .unwrap()
      .then(() => {
        alert("Movie updated successfully!");
        navigate('/admin/films');
      })
      .catch((err) => {
        console.error("Server error:", err);
        alert(typeof err === 'string' ? err : "Update failed!");
      });
  };

  return (
    <div
          className="mx-auto p-4 p-md-5 bg-black border border-secondary shadow-lg rounded-4 fade-in"
          style={{ maxWidth: "720px" }}
        >
        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom border-secondary pb-3">
          <div className="d-flex align-items-center gap-3">
            <div
              className="d-flex align-items-center justify-content-center bg-primary bg-opacity-25 text-primary rounded-3"
              style={{ width: "40px", height: "40px" }}
            >
              <i className="fa-solid fa-pen-nib"></i>
            </div>

            <h2 className="fs-2 fw-bold text-danger text-uppercase mb-0">
              Update Movie
              <span className="text-primary ms-2">#{id}</span>
            </h2>
          </div>

          <button
            type="button"
            className="btn btn-outline-light rounded-pill px-3"
            onClick={() => navigate(-1)}
          >
            <i className="fa-solid fa-arrow-left-long me-2"></i>
            Back
          </button>
        </div>

      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        <div>
          <label className="form-label fw-bold small text-white">Movie Title</label>
          <input name="tenPhim" value={movie.tenPhim} className="form-control bg-dark text-white border border-secondary rounded-3" onChange={handleChange} />
        </div>

        <div>
          <label className="form-label fw-bold small text-white">Description</label>
          <textarea name="moTa" value={movie.moTa} rows={4} className="form-control bg-dark text-white border border-secondary rounded-3" onChange={handleChange}></textarea>
        </div>

        <div>
          <label className="form-label fw-bold small text-white">Release Date</label>
          <DatePicker
            format="DD/MM/YYYY"
            className="form-control bg-dark border-secondary"
            value={movie.ngayKhoiChieu
              ? dayjs(movie.ngayKhoiChieu)
              : null}
            onChange={handleChangeDate}
          />
        </div>

        <div className="d-flex flex-column flex-sm-row align-items-start gap-3 p-3 bg-dark border border-secondary rounded-3">
          <div className="text-center">
            <p className="small fw-bold text-muted mb-2 text-uppercase">Current Poster</p>
            <div className="border border-secondary rounded overflow-hidden" style={{ width: "80px", height: "120px" }}>
              <img src={movieEdit?.hinhAnh} alt="preview" className="w-100 h-100 object-fit-cover" />
            </div>
          </div>
          <div className="flex-grow-1">
            <label className="form-label fw-bold small text-muted">Choose new image (if needed):</label>
            <input type="file" accept="image/*" className="form-control text-muted" onChange={handleChangeFile} />
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100 fw-bold text-uppercase mt-3">
          <i className="fa-solid fa-arrows-rotate me-2"></i> Confirm Update
        </button>
      </form>
    </div>
  );
}
