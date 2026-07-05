import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function AdminHeader({
  isSidebarOpen,
  setIsSidebarOpen,
}) {
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }) =>
    `nav-link-admin d-flex align-items-center gap-2 px-3 py-2 rounded text-decoration-none ${
      isActive ? "active-link" : ""
    }`;

  const getAdminData = () => {
    try {
      return (
        JSON.parse(localStorage.getItem("USER_ADMIN")) ||
        JSON.parse(localStorage.getItem("USER_LOGIN"))
      );
    } catch {
      return null;
    }
  };

  const userAdmin = getAdminData();

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
      localStorage.removeItem("USER_ADMIN");
      localStorage.removeItem("USER_LOGIN");
      navigate("/auth");
    }
  };

  return (
    <>
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-md-none"
          style={{ zIndex: 1040 }}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`bg-black border-end border-secondary shadow-lg d-md-none ${
          isSidebarOpen ? "sidebar-open" : "sidebar-close"
        }`}
        style={{
          width: "250px",
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          zIndex: 1050,
          transition: ".35s",
        }}
      >
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-secondary">
          <h4 className="m-0 fw-bold">
            UY <span className="text-danger">Cinema Admin</span>
          </h4>

          <button
            className="btn btn-outline-light btn-sm"
            onClick={() => setIsSidebarOpen(false)}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <nav className="p-3">

          <NavLink
            to="/admin/dashboard"
            className={navLinkClass}
            onClick={() => setIsSidebarOpen(false)}
          >
            <i className="fa-solid fa-chart-pie"></i>
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/films"
            className={navLinkClass}
            onClick={() => setIsSidebarOpen(false)}
          >
            <i className="fa-solid fa-film"></i>
            Movies
          </NavLink>

          <NavLink
            to="/admin/user"
            className={navLinkClass}
            onClick={() => setIsSidebarOpen(false)}
          >
            <i className="fa-solid fa-users"></i>
            Users
          </NavLink>
        </nav>

        <div className="border-top border-secondary p-3 mt-auto">

          <NavLink
            to="/"
            className="text-decoration-none text-light"
          >
            <i className="fa-solid fa-house me-2"></i>
            Back to Home
          </NavLink>

        </div>
      </aside>

      {/* Header */}
      <header
        className="sticky-top bg-black border-bottom border-secondary"
        style={{ zIndex: 1030 }}
      >
        <div className="container-fluid" style={{ height: "70px" }}>
          <div className="d-flex justify-content-between align-items-center h-100">

            {/* Left */}
            <div className="d-flex align-items-center">

              <button
                className="btn btn-outline-light me-3 d-md-none"
                onClick={() => setIsSidebarOpen(true)}
              >
                <i className="fa-solid fa-bars"></i>
              </button>

              <h4 className="m-0 fw-bold">
                UY <span className="text-danger">Cinema</span>
              </h4>

              <div className="ms-5 d-none d-md-flex gap-2">

                <NavLink
                  to="/admin/dashboard"
                  className={navLinkClass}
                >
                  <i className="fa-solid fa-chart-pie"></i>
                  Dashboard
                </NavLink>

                <NavLink
                  to="/admin/films"
                  className={navLinkClass}
                >
                  <i className="fa-solid fa-film"></i>
                  Movies
                </NavLink>

                <NavLink
                  to="/admin/user"
                  className={navLinkClass}
                >
                  <i className="fa-solid fa-users"></i>
                  Users
                </NavLink>

              </div>
            </div>

            {/* Right */}
            <div className="d-flex align-items-center gap-3">

              <NavLink
                to="/"
                className="btn btn-outline-light btn-sm d-none d-md-flex align-items-center"
              >
                <i className="fa-solid fa-house me-2"></i>
                Back to Home
              </NavLink>

              <div className="text-end d-none d-md-block">
                <p className="text-uppercase fw-bold text-danger small mb-0">
                  {userAdmin?.hoTen || "Administrator"}
                </p>

                <p
                  className="text-uppercase fw-bold text-danger mb-0"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                  }}
                >
                  SYSTEM {userAdmin?.maLoaiNguoiDung || "ADMIN"}
                </p>
              </div>

              <div className="dropdown">

                <button
                  className="btn btn-danger rounded-circle fw-bold"
                  style={{
                    width: 40,
                    height: 40,
                  }}
                  data-bs-toggle="dropdown"
                >
                  {userAdmin?.hoTen?.charAt(0).toUpperCase() || "A"}
                </button>

                <ul className="dropdown-menu dropdown-menu-end">

                  <li className="px-3 py-2">
                    <strong>{userAdmin?.hoTen}</strong>
                    <br />
                    <small>{userAdmin?.email}</small>
                  </li>

                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      <i className="fa-solid fa-power-off me-2"></i>
                      Logout
                    </button>
                  </li>

                </ul>

              </div>

            </div>

          </div>
        </div>
      </header>
    </>
  );
}