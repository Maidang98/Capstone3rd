import React from "react";
import QuickBooking from "../_components/QuickBooking";

export default function Booking() {
  return (
    <div className="bg-black min-vh-100 pt-5 pb-5">
      {/* HEADER */}
      <div className="container text-center mb-5">
        <h1 className="display-4 fw-bold text-white text-uppercase mb-3 fst-italic">
          Quick <span className="text-danger">Booking</span>
        </h1>
        <div
          className="mx-auto mb-4"
          style={{
            width: "100px",
            height: "6px",
            backgroundColor: "#dc3545",
            borderRadius: "10px",
            boxShadow: "0 0 15px rgba(220,38,38,0.5)",
          }}
        ></div>
        <p
          className="text-secondary fs-6 mx-auto"
          style={{ maxWidth: "600px" }}
        >
          No waiting required. Instantly choose your blockbuster movie and the
          most convenient cinema location for you in just a few simple steps.
        </p>
      </div>

      {/* QUICK BOOKING FORM */}
      <div className="container">
        <div className="position-relative">
          {/* subtle glow effect behind */}
          <div
            className="position-absolute w-100 h-100 rounded-4"
            style={{
              top: 0,
              left: 0,
              background:
                "linear-gradient(to right, rgba(220,53,69,0.2), rgba(33,37,41,0))",
              filter: "blur(40px)",
              opacity: 0.5,
              zIndex: -1,
            }}
          ></div>

          <div className="position-relative">
            <QuickBooking />
          </div>
        </div>
      </div>

      {/* FOOTER DECOR */}
      <div className="mt-5 text-center opacity-25">
        <p
          className="fw-bold text-uppercase text-secondary"
          style={{ fontSize: "60px", letterSpacing: "-2px" }}
        >
          Quick Ticket
        </p>
      </div>
    </div>
  );
}
