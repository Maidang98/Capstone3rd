import React, { useEffect, useState } from "react";
import { Carousel, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchBanners } from "../../Home/slice";
import Loading from "../loading";
import CountUp from "react-countup";

export default function HomeCarousel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openTrailer, setOpenTrailer] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const { banners = [], loading } = useSelector(
    (state) => state.homeReducer
  );

  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  const handleTrailer = (movie) => {
    setSelectedMovie(movie);
    setOpenTrailer(true);
  };

  return (
    <>
      {/* HERO CAROUSEL */}
      <section className="hero-section position-relative overflow-hidden">
        <Carousel autoplay effect="fade" speed={1000}>
          {banners.map((banner) => (
            <div key={banner.maBanner}>
              <div
                className="hero-slide"
                style={{
                  backgroundImage: `url(${banner.hinhAnh})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "650px",
                }}
              >
                <div className="hero-overlay d-flex align-items-center justify-content-start h-100">
                  <div style={{ maxWidth: "600px" }}>
                    <div className="hero-content glass-card p-4">
                      <span className="badge bg-danger mb-3 px-3 py-2 fs-5">
                        NOW SHOWING
                      </span>

                      <h1 className="hero-title text-white fw-bold" style={{ fontSize: "60px" }}>
                        {banner.tenPhim || "Premium Cinema Experience"}
                      </h1>

                      <div className="d-flex align-items-center gap-3 mb-3 flex-wrap">
                        <span className="rating-badge fw-bold fs-3">
                          ⭐ {banner.danhGia || "9.0"}/10
                        </span>
                        <span className="badge bg-dark border border-secondary fs-6">
                          Featured Movie
                        </span>
                      </div>

                      <p className="hero-description text-light fs-5">
                        {banner.moTa
                          ? banner.moTa.slice(0, 180) + "..."
                          : "Experience world-class storytelling, breathtaking visuals, and unforgettable cinematic moments."}
                      </p>

                      <div className="d-inline-flex flex-wrap gap-3 mt-4">
                      <button
                        type="button"
                          className="btn btn-danger btn-lg px-5"
                          onClick={() => navigate(`/detail/${banner.maPhim}`)}
                        >
                          <i className="fa-solid fa-ticket me-2"></i>
                          Book Tickets
                        </button>
                        <button
                            className="btn btn-dark btn-lg px-5"
                            onClick={() => handleTrailer(banner)}
                          >
                            <i className="fa-solid fa-film me-2"></i>
                            Watch Trailer
                          </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>

        <div className="hero-bottom-gradient"></div>
      </section>

      {/* PROMOTION SECTION */}
      <section
        className="bg-black py-5 position-relative text-white"
        style={{
          backgroundImage: "url(/images/popcornanddrink.avif)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.65)",
          }}
        />
        <div className="container position-relative">
          <div className="text-center mb-5">
            <h2 className="text-white fw-bold">🍿 Food & Drink Promotions</h2>
            <p className="text-light">Make your movie night even better.</p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="promo-card p-4 bg-black rounded shadow-sm">
                <h4>🍿 Combo Saver</h4>
                <p>Large Popcorn + Large Drink</p>
                <span className="promo-discount text-danger fw-bold">
                  Save 30%
                </span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="promo-card p-4 bg-black rounded shadow-sm">
                <h4>🎉 Weekend Special</h4>
                <p>Buy 2 Tickets & Get Free Popcorn</p>
                <span className="promo-discount text-warning fw-bold">
                  Limited Time
                </span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="promo-card p-4 bg-black rounded shadow-sm">
                <h4>🥤 Family Pack</h4>
                <p>Popcorn + 4 Drinks</p>
                <span className="promo-discount text-success fw-bold">
                  Best Value
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-5 position-relative text-white why-choose-us pt-5" style={{ backgroundColor: "#000" }}>
            <div 
              className="position-absolute w-100 h-100" 
              style={{
                top: 0,
                left: 0,
                backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
                zIndex: 0
              }}
            />
        <div className="container position-relative" style={{ zIndex: 1 }}>
          <h2 className="text-center text-white fw-bold mb-5">
            WHY CHOOSE US
          </h2>
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <h2 className="text-danger fw-bold">
                <CountUp end={50000} duration={2} />+
              </h2>
              <p className="text-light fs-5">Happy Customers</p>
            </div>
            <div className="col-md-4 mb-4">
              <h2 className="text-danger fw-bold">
                <CountUp end={200} duration={2} />
              </h2>
              <p className="text-light fs-5">Movies Available</p>
            </div>
            <div className="col-md-4 mb-4">
              <h2 className="text-danger fw-bold">
                <CountUp end={4000} duration={2} />+
              </h2>
              <p className="text-light fs-5">Ultra HD Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trailer Modal */}
      <Modal
        open={openTrailer}
        footer={null}
        onCancel={() => setOpenTrailer(false)}
        width={900}
      >
        <div className="p-3">
          <h3>{selectedMovie?.tenPhim}</h3>
          <p className="text-secondary">Trailer feature coming soon...</p>
        </div>
      </Modal>
    </>
  );
}
