import React, { useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { fetchListMovieAdmin } from "../Films/slice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { listMovie } = useSelector((state) => state.filmsReducer);

  useEffect(() => {
    dispatch(fetchListMovieAdmin());
  }, [dispatch]); 

  const total = listMovie?.length || 0;
  const currentlyShowing = listMovie?.filter(item => item.dangChieu).length || 0;
  const upcoming = listMovie?.filter(item => item.sapChieu).length || 0;

  return (
    <div className="d-flex flex-column gap-4 fade-in bg-black">
      {/* Dashboard Title */}
      <div>
        <h1 className="fs-2 fw-bold text-danger text-uppercase text-center mt-5">System Overview</h1>
        <p className="text-light small text-center">Latest statistics updated from the cinema system.</p>
      </div>

      {/* Grid Stats */}
      <div className="row g-4 bg-black">
        
        {/* Total Movies */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="p-4 bg-dark border border-secondary rounded-4 shadow-sm h-100">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div className="p-3 bg-primary bg-opacity-25 rounded-3">
                <i className="fa-solid fa-film text-primary fs-4"></i>
              </div>
              <span className="badge bg-primary">MOVIE</span>
            </div>
            <p className="text-muted small fw-medium">Total Movies</p>
            <p className="fs-2 fw-bold text-white">{total}</p>
          </div>
        </div>

        {/* Currently Showing */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="p-4 bg-dark border border-secondary rounded-4 shadow-sm h-100">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div className="p-3 bg-success bg-opacity-25 rounded-3">
                <i className="fa-solid fa-play text-success fs-4"></i>
              </div>
              <span className="badge bg-success">LIVE</span>
            </div>
            <p className="text-muted small fw-medium">Currently Showing</p>
            <p className="fs-2 fw-bold text-white">{currentlyShowing}</p>
          </div>
        </div>

        {/* Upcoming */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="p-4 bg-dark border border-secondary rounded-4 shadow-sm h-100">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div className="p-3 bg-warning bg-opacity-25 rounded-3">
                <i className="fa-solid fa-clock text-warning fs-4"></i>
              </div>
              <span className="badge bg-warning text-dark">SOON</span>
            </div>
            <p className="text-muted small fw-medium">Upcoming Movies</p>
            <p className="fs-2 fw-bold text-white">{upcoming}</p>
          </div>
        </div>

        {/* Cinema Locations */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="p-4 bg-dark border border-secondary rounded-4 shadow-sm h-100">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div className="p-3 bg-info bg-opacity-25 rounded-3">
                <i className="fa-solid fa-search-location text-info fs-4"></i>
              </div>
              <span className="badge bg-info">LOCATION</span>
            </div>
            <p className="text-muted small fw-medium">Managed Cinemas</p>
            <p className="fs-2 fw-bold text-white">8</p>
          </div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-dark border border-secondary rounded-4 p-4 text-center">
        <p className="text-white text-center fst-italic">Detailed revenue data.</p>
      </div>
    </div>
  );
}
