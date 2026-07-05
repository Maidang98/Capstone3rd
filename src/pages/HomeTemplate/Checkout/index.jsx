import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoomDetail } from './slice';
import SeatMap from './../_components/SeatMap';
import TicketInfo from './../_components/TicketInfo';
import SeatLegend from '../_components/SeatLegend';
import Loading from '../_components/loading';

export default function Checkout() {
  const { maLichChieu } = useParams();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.checkoutReducer);

  useEffect(() => {
    dispatch(fetchRoomDetail(maLichChieu));
  }, [maLichChieu]);

  if (loading){
    return <Loading/>;
  }

  return (
    <div className="min-vh-100 bg-black pt-5 pb-4 text-white">
      <div className="container">
        <div className="row g-4 g-lg-5">
          
          {/* LEFT SIDE: SEAT BOOKING AREA */}
          <div className="col-12 col-lg-8 d-flex flex-column align-items-center">
            
            {/* SCREEN AREA */}
            <div className="position-relative w-100 mb-5 mt-3">
              <div className="mx-auto rounded-pill" 
                   style={{width:"90%",height:"0.5rem",
                           background:"linear-gradient(to right, transparent, #a1a1a1, transparent)",
                           boxShadow:"0 15px 40px rgba(220,38,38,0.5)"}}>
              </div>
              <div className="position-absolute top-0 start-50 translate-middle-x rounded-pill" 
                   style={{width:"80%",height:"5rem",
                           background:"linear-gradient(to bottom, rgba(220,38,38,0.1), transparent)",
                           filter:"blur(40px)",opacity:0.5}}>
              </div>
              <p className="text-center text-secondary small mt-3 fw-bold text-uppercase" style={{letterSpacing:"0.3em"}}>
                Screen
              </p>
            </div>

            {/* SEAT MAP */}
            <div className="w-100 overflow-auto pb-4">
               <div className="d-flex justify-content-center" style={{minWidth:"600px"}}>
                  <SeatMap />
               </div>
            </div>

            {/* SEAT LEGEND */}
            <div className="w-100 mt-3 p-4 bg-dark bg-opacity-50 rounded-4 border border-secondary">
               <SeatLegend />
            </div>
          </div>

          {/* RIGHT SIDE: BILLING INFO */}
          <div className="col-12 col-lg-4 position-relative">
            <div className="position-sticky" style={{top:"7rem"}}>
              <TicketInfo />
              
              {/* Quick Support Info */}
              <div className="mt-4 p-3 bg-dark bg-opacity-25 border border-secondary rounded-3">
                <p className="small text-secondary text-uppercase fw-bold" style={{letterSpacing:"-0.05em"}}>
                  Note: Purchased tickets cannot be exchanged or refunded. Please double-check your seat numbers and cinema before completing payment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
