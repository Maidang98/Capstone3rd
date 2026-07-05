import React, { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import {
  fetchMoviesForBooking,
  fetchMovieSchedule,
  clearSchedule,
  selectAllMovies,
  selectMovieSchedule,
} from "../../Booking/slice";

/* CUSTOM SELECT COMPONENT */
function CustomSelect({
  placeholder,
  value,
  onChange,
  options,
  disabled,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((opt) => opt.value === value);

  return (
    <div ref={ref} className="position-relative w-100">
      {/* BUTTON */}
      <button
        onClick={() => !disabled && setOpen(!open)}
        className={`form-control text-start p-3 rounded ${disabled
          ? "bg-secondary text-muted disabled"
          : "bg-dark text-white border border-secondary"
          }`}
        disabled={disabled}
      >
        <span className="text-truncate">
          {selected ? selected.label : placeholder}
        </span>
      </button>

      {/* DROPDOWN */}
      {open && !disabled && (
        <div className="position-absolute mt-2 w-100 bg-dark border border-secondary rounded shadow-lg overflow-auto" style={{ maxHeight: "240px", zIndex: 100 }}>
          {options.length === 0 && (
            <div className="p-3 text-muted fst-italic">No data available</div>
          )}

          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`p-3 cursor-pointer ${value === opt.value
                ? "bg-danger text-white"
                : "text-light bg-dark hover-bg-secondary"
                }`}
              style={{ transition: "all 0.2s" }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function QuickBooking() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // STATE
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const [selectedCinemaId, setSelectedCinemaId] = useState("");
  const [selectedSessionId, setSelectedSessionId] = useState("");

  // STORE
  const movieList = useSelector(selectAllMovies);
  const movieSchedule = useSelector(selectMovieSchedule);

  // FETCH MOVIES
  useEffect(() => {
    dispatch(fetchMoviesForBooking());
  }, [dispatch]);

  // FETCH SCHEDULE
  useEffect(() => {
    if (selectedMovieId) {
      dispatch(fetchMovieSchedule(selectedMovieId));
    }
  }, [selectedMovieId, dispatch]);

  // RESET
  const handleMovieChange = (movieId) => {
    setSelectedMovieId(movieId);
    setSelectedCinemaId("");
    setSelectedSessionId("");
    dispatch(clearSchedule());
  };

  // CINEMA LIST
  const cinemaList = useMemo(() => {
    if (!movieSchedule?.heThongRapChieu) return [];
    return movieSchedule.heThongRapChieu.flatMap((htr) =>
      htr.cumRapChieu.map((cum) => ({
        ...cum,
        tenHeThongRap: htr.tenHeThongRap,
      }))
    );
  }, [movieSchedule]);

  // AUTO SELECT CINEMA
  useEffect(() => {
    if (cinemaList.length > 0 && !selectedCinemaId) {
      setSelectedCinemaId(cinemaList[0].maCumRap);
    }
  }, [cinemaList, selectedCinemaId]);

  // SESSION LIST
  const sessionList = useMemo(() => {
    const cinema = cinemaList.find(
      (c) => c.maCumRap === selectedCinemaId
    );
    return cinema?.lichChieuPhim || [];
  }, [cinemaList, selectedCinemaId]);

  // AUTO SELECT SESSION
  useEffect(() => {
    if (sessionList.length > 0 && !selectedSessionId) {
      setSelectedSessionId(sessionList[0].maLichChieu);
    }
  }, [sessionList, selectedSessionId]);

  return (
    <div className="bg-dark bg-opacity-75 p-4 rounded border border-secondary shadow-lg d-flex flex-column flex-lg-row gap-3 align-items-lg-end">
      {/* SELECT MOVIE */}
      <div className="w-100 flex-lg-fill">
        <label className="text-uppercase fw-bold text-danger mb-2 d-block small">
          🎬 Select Movie
        </label>
        <CustomSelect
          placeholder="Choose the movie you want to watch..."
          value={selectedMovieId}
          onChange={handleMovieChange}
          options={movieList.map((m) => ({
            value: m.maPhim,
            label: m.tenPhim,
          }))}
        />
      </div>

      {/* SELECT CINEMA */}
      <div className="w-100 flex-lg-fill">
        <label className="text-uppercase fw-bold text-danger mb-2 d-block small">
          📍 Select Cinema
        </label>
        <CustomSelect
          placeholder={
            selectedMovieId
              ? "Choose cinema..."
              : "Please select a movie first"
          }
          value={selectedCinemaId}
          onChange={setSelectedCinemaId}
          disabled={!selectedMovieId}
          options={cinemaList.map((c) => ({
            value: c.maCumRap,
            label: `${c.tenHeThongRap} - ${c.tenCumRap}`,
          }))}
        />
      </div>

      {/* SELECT SHOWTIME */}
      <div className="w-100 flex-lg-fill">
        <label className="text-uppercase fw-bold text-danger mb-2 d-block small">
          ⏰ Showtime
        </label>
        <CustomSelect
          placeholder={
            selectedCinemaId
              ? "Choose showtime..."
              : "Please select a cinema first"
          }
          value={selectedSessionId}
          onChange={setSelectedSessionId}
          disabled={!selectedCinemaId}
          options={sessionList.map((s) => ({
            value: s.maLichChieu,
            label: moment(s.ngayChieuGioChieu).format(
              "DD/MM/YYYY ~ HH:mm"
            ),
          }))}
        />
      </div>

      {/* BUTTON */}
      <button
        disabled={!selectedSessionId}
        onClick={() => navigate(`/checkout/${selectedSessionId}`)}
        className="btn btn-danger fw-bold text-uppercase px-4 py-3 mt-1 mt-lg-0 shadow"
      >
        Book Now
      </button>
    </div>
  );
}
