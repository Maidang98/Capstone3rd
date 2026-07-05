import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchListMovieAdmin, deleteMovie } from "./slice";

export default function Films() {
  const dispatch = useDispatch();
  const { listMovie, loading } = useSelector((state) => state.filmsReducer);

  useEffect(() => {
    dispatch(fetchListMovieAdmin());
  }, [dispatch]);

  const handleDelete = (movieId) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      dispatch(deleteMovie(movieId))
        .unwrap()
        .then(() => {
          alert("Movie deleted successfully!");
          dispatch(fetchListMovieAdmin());
        })
        .catch((error) => {
          alert(error || "Failed to delete movie!");
        });
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const filteredMovies = listMovie?.filter((movie) =>
    movie.tenPhim.toLowerCase().includes(searchTerm.toLowerCase())
  );


  if (loading) return <div className="text-center mt-4 fs-5">Loading movie data...</div>;

  return (
    <div className="p-4 p-md-5 fade-in">
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 gap-3">
          <div>
            <h2 className="fs-2 fw-bold text-danger text-uppercase text-center">Movie Management</h2>
            <p className="text-white small">List of all movies in the system.</p>
          </div>
          
          <div className="d-flex gap-2">
            <input
              type="text"
              placeholder="🔍 Search movie..."
              className="form-control bg-dark text-white border border-secondary rounded-3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ maxWidth: "240px" }}
            />
            <NavLink 
              to="/admin/films/addnew" 
              className="btn btn-danger fw-bold shadow d-flex align-items-center gap-2"
            >
              <i className="fa-solid fa-plus"></i> Add New Movie
            </NavLink>
          </div>
        </div>


      <div className="table-responsive bg-dark border border-secondary rounded-4 shadow-lg">
        <table className="table table-dark table-hover align-middle mb-0">
          <thead className="table-secondary text-uppercase small">
            <tr>
              <th className="fw-bold">Movie ID</th>
              <th className="fw-bold">Poster</th>
              <th className="fw-bold">Title</th>
              <th className="fw-bold">Description</th>
              <th className="fw-bold text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMovies?.map((movie) => (
              <tr key={movie.maPhim}>
                <td className="fw-bold text-white">{movie.maPhim}</td>
                <td>
                  <div className="border rounded overflow-hidden" style={{ width: "64px", height: "80px" }}>
                    <img src={movie.hinhAnh} alt={movie.tenPhim} className="w-100 h-100 object-fit-cover" />
                  </div>
                </td>
                <td className="fw-bold text-white">{movie.tenPhim}</td>
                <td>
                  <p className="text-white text-truncate" style={{ maxWidth: "200px" }} title={movie.moTa}>
                    {movie.moTa}
                  </p>
                </td>
                <td>
        <div className="d-flex justify-content-center gap-2">
          <NavLink 
            to={`/admin/films/edit/${movie.maPhim}`}
            className="btn btn-sm btn-outline-primary"
            title="Edit"
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </NavLink>
          <button 
            onClick={() => handleDelete(movie.maPhim)}
            className="btn btn-sm btn-outline-danger"
            title="Delete"
          >
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
}
