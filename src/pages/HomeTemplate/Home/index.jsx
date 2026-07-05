import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";
import { fetchBanners, fetchData } from './slice';
import Movie from './../_components/moive';
import HomeCarousel from '../_components/HomeCarousel';
import { sliderSettings } from '../_components/SliderConfig';

// Next Button
const NextArrow = ({ onClick }) => (
  <div
    className="position-absolute top-50 end-0 translate-middle-y bg-black bg-opacity-50 text-white d-flex align-items-center justify-content-center rounded-circle border border-secondary"
    style={{width:"2.5rem",height:"2.5rem",cursor:"pointer"}}
    onClick={onClick}
  >
    <i className="fa-solid fa-chevron-right"></i>
  </div>
);

// Prev Button
const PrevArrow = ({ onClick }) => (
  <div
    className="position-absolute top-50 start-0 translate-middle-y bg-black bg-opacity-50 text-white d-flex align-items-center justify-content-center rounded-circle border border-secondary"
    style={{width:"2.5rem",height:"2.5rem",cursor:"pointer"}}
    onClick={onClick}
  >
    <i className="fa-solid fa-chevron-left"></i>
  </div>
);

export default function Home() {
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.homeReducer);

  const [viewAll, setViewAll] = useState(false);

  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchBanners());
    window.scrollTo(0, 0);
  }, [dispatch]);

  const settings = {
    ...sliderSettings,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  const nowShowing = data?.filter(movie => movie.dangChieu);
  const comingSoon = data?.filter(movie => movie.sapChieu);
  const hotMovies = data?.filter(movie => movie.hot);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-black">
      <div className="spinner-border text-danger" style={{width:"5rem",height:"5rem"}}></div>
    </div>
  );

  return (
    <div className="bg-black min-vh-100 text-white pb-5 overflow-hidden">
      {/* Banner */}
      <HomeCarousel />

      {/* Main Content */}
      <div className="container mt-5">
        
        {viewAll ? (
          // All Movies Section
          <section>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="fw-bold text-uppercase border-start border-danger ps-3">
                All Movies
              </h2>
              <button 
                className="btn btn-link text-secondary fw-bold text-uppercase p-0"
                onClick={() => setViewAll(false)}
              >
                Back
              </button>
            </div>
            <Slider {...settings}>
              {data?.map(movie => (
                <div key={movie.maPhim} className="p-2">
                  <Movie movie={movie} />
                </div>
              ))}
            </Slider>
          </section>
        ) : (
          <>
            {/* Now Showing */}
            <section>
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-end gap-3 mb-4">
                <h2 className="fw-bold text-uppercase border-start border-danger ps-3">
                  Now Showing
                </h2>
                <button 
                  className="btn btn-link text-danger fw-bold text-uppercase p-0"
                  onClick={() => setViewAll(true)}
                >
                  View All +
                </button>
              </div>
              <Slider {...settings}>
                {nowShowing?.map(movie => (
                  <div key={movie.maPhim} className="p-2">
                    <Movie movie={movie} />
                  </div>
                ))}
              </Slider>
            </section>

            {/* Hot Blockbusters */}
            <section className="mt-5">
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-end gap-3 mb-4">
                <h2 className="fw-bold text-uppercase border-start border-secondary ps-3">
                  Hot Blockbusters
                </h2>
              </div>
              <Slider {...settings}>
                {hotMovies?.map(movie => (
                  <div key={movie.maPhim} className="p-2">
                    <Movie movie={movie} />
                  </div>
                ))}
              </Slider>
            </section>

            {/* Coming Soon */}
            <section className="mt-5">
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-end gap-3 mb-4">
                <h2 className="fw-bold text-uppercase border-start border-secondary ps-3">
                  Coming Soon
                </h2>
              </div>
              <Slider {...settings}>
                {comingSoon?.map(movie => (
                  <div key={movie.maPhim} className="p-2 opacity-75 hover-opacity-100">
                    <Movie movie={movie} />
                  </div>
                ))}
              </Slider>
            </section>
          </>
        )}
      </div>

      {/* Decorative Effects */}
      <div className="position-fixed top-50 start-0 translate-middle-y rounded-circle bg-danger bg-opacity-25" 
           style={{width:"300px",height:"300px",filter:"blur(80px)",zIndex:0}}></div>
      <div className="position-fixed bottom-0 end-0 rounded-circle bg-primary bg-opacity-25" 
           style={{width:"300px",height:"300px",filter:"blur(80px)",zIndex:0}}></div>
    </div>
  );
}
