import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../Login/slice";

export default function Header() {
  const dispatch = useDispatch();
  const { userLogin } = useSelector((state) => state.loginReducer);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logOut());
    setOpen(false);
  };

  const navClass = ({ isActive }) =>
    `nav-link px-3 ${isActive ? "text-danger fw-bold" : "text-light"}`;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary sticky-top py-3 shadow-sm">
      <div className="container">

        {/* Logo */}
        <NavLink className="navbar-brand fw-bold fs-2 fst-italic" to="/">
        UY <span className="text-danger">Cinema</span>
        </NavLink>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler"
          onClick={() => setOpen(!open)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className={`collapse navbar-collapse ${open ? "show" : ""}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 fs-5">
            <li className="nav-item">
              <NavLink to="/" end className={navClass} onClick={() => setOpen(false)}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/list-movie" className={navClass} onClick={() => setOpen(false)}>
                Movies
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/booking" className={navClass} onClick={() => setOpen(false)}>
                Booking
              </NavLink>
            </li>
          </ul>

          {/* Login / Logout */}
          <div className="d-flex align-items-center gap-3">
            {userLogin ? (
              <div className="d-flex align-items-center gap-3">
                <div className="text-end">
                  <span className="small text-danger text-uppercase fw-bold d-block">
                    Member
                  </span>
                  <span className="text-white fw-bold">
                    Welcome, <span className="text-danger">{userLogin.hoTen}</span>
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-outline-light fw-bold"
                >
                  LOG OUT
                </button>

                {/* Admin only visible for QuanTri */}
                {userLogin.maLoaiNguoiDung === "QuanTri" && (
                  <NavLink
                    to="/auth"
                    onClick={() => setOpen(false)}
                    className="btn btn-warning fw-bold btn-sm"
                  >
                    ADMIN
                  </NavLink>
                )}
              </div>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="btn btn-danger fw-bold btn-sm"
                >
                  LOG IN
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="btn btn-danger fw-bold btn-sm"
                >
                  SIGN UP
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
