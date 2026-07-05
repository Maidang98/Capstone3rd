import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchDetailMovie } from './slice';
import LichChieuDetail from '../_components/LichChieuDetail';

export default function Detail() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const { maPhim } = useParams();
    const [activeCinema, setActiveCinema] = useState(0);

    const { loading, data } = useSelector((state) => state.detailMovieReducer);
    const { detail, schedule } = data || {};

    const handleBooking = (maLichChieu) => {
        if (maLichChieu) {
            navigate(`/checkout/${maLichChieu}`);
        } else {
            alert("Currently, this movie has no scheduled showtimes.");
        }
    };

    const firstTicketId = schedule?.heThongRapChieu?.[0]?.cumRapChieu?.[0]?.lichChieuPhim?.[0]?.maLichChieu;

    useEffect(() => {
        if (maPhim) {
            dispatch(fetchDetailMovie(maPhim));
        }
        window.scrollTo(0, 0);
    }, [maPhim, dispatch]);

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark">
            <div className="spinner-border text-danger" style={{width:"4rem",height:"4rem"}}></div>
        </div>
    );

    if (!data) return (
        <div className="min-vh-100 bg-dark d-flex align-items-center justify-content-center text-white fs-4">
            Movie information not found.
        </div>
    );

    return (
        <div className="bg-black min-vh-100 text-white pb-5">
            {/* Banner blur */}
            <div className="position-relative" style={{height:"300px"}}>
                <img
                    src={detail?.hinhAnh}
                    className="w-100 h-100 object-fit-cover"
                    style={{filter:"blur(20px)",opacity:0.3,transform:"scale(1.1)"}}
                    alt="backdrop"
                />
                <div className="position-absolute top-0 start-0 w-100 h-100" 
                     style={{background:"linear-gradient(to top, #0f0f0f, transparent)"}}>
                </div>
            </div>

            {/* Main content */}
            <div className="container position-relative" style={{marginTop:"-8rem"}}>
                <div className="row g-4">
                    
                    {/* Movie Poster */}
                    <div className="col-md-4 d-flex flex-column align-items-center align-items-md-start">
                        <img
                            src={detail?.hinhAnh}
                            alt={detail?.tenPhim}
                            className="w-75 w-md-100 rounded shadow-lg border border-secondary"
                        />
                        <button
                            onClick={() => handleBooking(firstTicketId)}
                            className="btn btn-danger w-75 w-md-100 mt-3 fw-bold text-uppercase shadow-sm"
                        >
                            Book Tickets Now
                        </button>
                    </div>

                    {/* Movie Info */}
                    <div className="col-md-8 d-flex flex-column justify-content-end text-center text-md-start mt-3 mt-md-0">
                        <h1 className="fw-bold text-uppercase mb-3" style={{fontSize:"2.5rem"}}>
                            {detail?.tenPhim}
                        </h1>

                        <div className="d-flex justify-content-center justify-content-md-start gap-3 mb-4">
                            <span className="badge bg-danger">PG-18</span>
                            <span className="text-warning fw-bold">★ {detail?.danhGia}/10</span>
                            <span className="text-secondary">{new Date(detail?.ngayKhoiChieu).getFullYear()}</span>
                        </div>

                        <div className="bg-dark bg-opacity-25 p-4 rounded border border-secondary text-start">
                            <h2 className="text-danger fw-bold text-uppercase mb-2 small">Movie Description</h2>
                            <p className="text-light fst-italic">
                                "{detail?.moTa || 'Content is being updated...'}"
                            </p>
                        </div>
                    </div>
                </div>

                {/* Showtimes Section */}
                <div className="mt-5">
                    <h3 className="fw-bold mb-4 border-start border-danger ps-3 text-uppercase">
                        Showtimes & Sessions
                    </h3>

                    {schedule?.heThongRapChieu?.length > 0 ? (
                        <div className="row bg-black bg-opacity-50 rounded border border-secondary shadow overflow-hidden">
                            {/* TABS LOGO */}
                            <div className="col-lg-3 border-end d-flex flex-row flex-lg-column overflow-auto">
                            {schedule.heThongRapChieu.map((htr, index) => (
                                   <button
                                   key={htr.maHeThongRap}
                                   onClick={() => setActiveCinema(index)}
                                   className={`cinema-tab d-flex flex-column align-items-center justify-content-center p-3 flex-shrink-0 ${
                                       activeCinema === index ? "active" : ""
                                   }`}
                               >
                                        <img src={htr.logo} className="mb-2" style={{width:"3rem",height:"3rem",filter:"grayscale(100%)"}} alt={htr.tenHeThongRap} />
                                        <span className="fw-bold text-secondary text-uppercase small text-center">
                                            {htr.tenHeThongRap}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            {/* CINEMA CLUSTERS & SHOWTIMES */}
                            <div className="col-lg-9 p-4">
                            {schedule.heThongRapChieu[activeCinema]?.cumRapChieu.map((cinemaCluster) => (
                                    <div key={cinemaCluster.maCumRap} className="mb-4">
                                        <h4 className="fw-bold text-danger mb-3 d-flex align-items-center">
                                            <svg className="me-2" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
                                            </svg>
                                            <span>{cinemaCluster.tenCumRap}</span>
                                        </h4>

                                        <LichChieuDetail 
                                            lichChieu={cinemaCluster.lichChieuPhim} 
                                            handleBooking={handleBooking} 
                                        />
                                        
                                        <hr className="mt-4 border-secondary" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="p-5 bg-dark rounded border border-secondary text-center text-secondary">
                            This movie currently has no scheduled showtimes in the system.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
