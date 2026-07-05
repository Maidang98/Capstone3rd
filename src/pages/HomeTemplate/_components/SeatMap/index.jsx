import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { datGhe } from '../../Checkout/slice';

export default function SeatMap() {
    const dispatch = useDispatch();
    const { roomTicketDetail, danhSachGheDangDat } = useSelector((state) => state.checkoutReducer);
    const { danhSachGhe } = roomTicketDetail || {};

    return (
        <div
            className="
                d-grid 
                gap-2 gap-sm-2 gap-md-3
                justify-content-center
            "
            style={{
                gridTemplateColumns: "repeat(6, 1fr)",
            }}
        >
            {danhSachGhe?.map((seat) => {
                const isSelected = danhSachGheDangDat.find(
                    (s) => s.maGhe === seat.maGhe
                );

                let seatClass = `
                    d-flex align-items-center justify-content-center 
                    fw-bold 
                    rounded 
                    transition-all 
                `;

                let seatStyle = {
                    width: "2.5rem",
                    height: "2.5rem",
                    fontSize: "0.75rem",
                };

                if (seat.daDat) {
                    seatClass += `
                        bg-success text-white 
                        disabled
                    `;
                } else if (isSelected) {
                    seatClass += `
                        bg-warning text-dark 
                        shadow 
                    `;
                    seatStyle.transform = "scale(1.1)";
                    seatStyle.boxShadow = "0 0 12px #eab308";
                } else {
                    seatClass += `
                        bg-danger text-white 
                    `;
                    seatStyle.cursor = "pointer";
                }

                return (
                    <button
                        key={seat.maGhe}
                        disabled={seat.daDat}
                        onClick={() => dispatch(datGhe(seat))}
                        className={seatClass}
                        style={seatStyle}
                    >
                        {seat.daDat ? (
                            <i className="fa-solid fa-xmark small"></i>
                        ) : (
                            seat.stt
                        )}
                    </button>
                );
            })}
        </div>
    );
}
