import React from 'react';

const legendItems = [
  {
    class: "bg-danger",
    text: "Available Seat",
    icon: null
  },
  {
    class: "bg-warning",
    text: "Your Selected Seat",
    icon: null
  },
  {
    class: "bg-success text-white border border-secondary",
    text: "Booked Seat",
    icon: <i className="fa-solid fa-xmark small"></i> 
  }
];

export default function SeatLegend() {
  return (
    <div
      className="
        bg-dark border border-secondary 
        rounded-3 
        p-3 p-sm-4 p-md-5 
        w-100 mt-4 
        d-flex flex-column flex-sm-row flex-wrap 
        justify-content-center justify-content-md-between 
        gap-3 gap-md-4 
        shadow-sm
      "
    >
      {legendItems.map((item, index) => (
        <div
          key={index}
          className="d-flex align-items-center gap-2 min-w-140"
          style={{ minWidth: "140px" }}
        >
          {/* Seat box */}
          <div
            className={`
              d-flex align-items-center justify-content-center 
              fw-bold 
              ${item.class}
            `}
            style={{
              width: "2rem",
              height: "2rem",
              borderRadius: "0.25rem",
              fontSize: "0.75rem"
            }}
          >
            {item.icon}
          </div>

          {/* Text */}
          <span className="text-light small fw-medium">
            {item.text}
          </span>
        </div>
      ))}
    </div>
  );
}
