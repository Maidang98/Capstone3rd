import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { bookTicket, clearBooking } from "../../Checkout/slice";

export default function TicketInfo() {
  const { danhSachGheDangDat } = useSelector((state) => state.checkoutReducer);
  const dispatch = useDispatch();
  const { maLichChieu } = useParams();

  const total = danhSachGheDangDat.reduce((sum, seat) => sum + seat.giaVe, 0);

  const handleCheckout = () => {
    const ticketListApi = danhSachGheDangDat.map((seat) => ({
      maGhe: seat.maGhe,
      giaVe: seat.giaVe,
    }));

    const bookingInfo = {
      maLichChieu: Number(maLichChieu),
      danhSachVe: ticketListApi,
    };

    dispatch(bookTicket(bookingInfo))
      .unwrap()
      .then(() => dispatch(clearBooking()))
      .catch((error) => {
        console.log("Booking error: ", error);
        alert(error || "An error occurred while booking!");
      });
  };

  return (
    <div className="bg-white p-4 p-md-5 rounded-3 text-dark shadow-lg position-relative overflow-hidden">
      {/* Decorative cut edges */}
      <div className="d-none d-md-block position-absolute start-0 top-50 translate-middle-y bg-dark rounded-pill" style={{width:"1rem",height:"2rem"}}></div>
      <div className="d-none d-md-block position-absolute end-0 top-50 translate-middle-y bg-dark rounded-pill" style={{width:"1rem",height:"2rem"}}></div>

      {/* TOTAL AMOUNT */}
      <div className="text-center text-md-start border-bottom border-dashed pb-3 mb-3">
        <p className="small fw-bold text-secondary text-uppercase mb-1">Total Payment</p>
        <h2 className="fw-bold text-success">
          {total.toLocaleString()} <span className="fs-6">VND</span>
        </h2>
      </div>

      {/* SELECTED SEATS */}
      <div className="py-3 border-bottom border-dashed mb-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <p className="small fw-bold text-secondary text-uppercase mb-0">Selected Seats:</p>
          <span className="badge bg-danger text-white fw-bold">
            {danhSachGheDangDat.length} seats
          </span>
        </div>

        <div className="d-flex flex-wrap gap-2" style={{minHeight:"40px"}}>
          {danhSachGheDangDat.length > 0 ? (
            danhSachGheDangDat.map((seat) => (
              <span 
                key={seat.maGhe} 
                className="badge bg-light text-danger border border-danger fw-bold animate-pulse"
              >
                {seat.tenGhe}
              </span>
            ))
          ) : (
            <span className="small fst-italic text-secondary">Please select seats...</span>
          )}
        </div>
      </div>

      {/* ADDITIONAL INFO */}
      <div className="py-3">
        <div className="d-flex justify-content-between small mb-2">
          <span className="text-secondary">Method:</span>
          <span className="fw-bold text-dark">Online</span>
        </div>
        <div className="d-flex justify-content-between small">
          <span className="text-secondary">Service Fee:</span>
          <span className="fw-bold text-dark">Free</span>
        </div>
      </div>

      {/* CHECKOUT BUTTON */}
      <button 
        disabled={danhSachGheDangDat.length === 0}
        onClick={handleCheckout} 
        className="btn btn-danger w-100 fw-bold text-uppercase shadow mt-2"
        style={{padding:"1rem",borderRadius:"1rem"}}
      >
        Pay Now
      </button>

      <p className="small text-secondary text-center mt-3 fst-italic">
        * Please double-check your information before payment
      </p>
    </div>
  );
}
