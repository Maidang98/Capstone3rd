import React, { useState } from "react";
import { actAuth } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "../_components/Loader";

export default function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, data, error } = useSelector((state) => state.authReducer);

  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  const [errors, setErrors] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  const isDisableLogin =
    !user.taiKhoan || !user.matKhau || errors.taiKhoan || errors.matKhau;

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(actAuth(user));
  };

  const validationForm = (event) => {
    const { name, value } = event.target;
    let mess = value.trim() === "" ? `Please fill in ${name}` : "";

    switch (name) {
      case "taiKhoan":
        if (value.trim() && value.trim().length < 4) {
          mess = "Username must be at least 4 characters";
        }
        break;
    
      case "matKhau":
        if (value.trim() && value.trim().length < 6) {
          mess = "Password must be at least 6 characters";
        }
        break;
    
      default:
        break;
    }

    setErrors({
      ...errors,
      [name]: mess,
    });
  };

  if (data) {
    return <Navigate to="/admin/dashboard" />;
  }

  if (loading) return <Loading />;

  return (
    <div className="min-vh-100 bg-dark d-flex align-items-center justify-content-center p-4 position-relative overflow-hidden">
      {/* Background Decor */}
      <div
        className="position-absolute top-0 start-0 translate-middle bg-primary opacity-25 rounded-circle"
        style={{ width: "320px", height: "320px", filter: "blur(120px)" }}
      ></div>
      <div
        className="position-absolute bottom-0 end-0 translate-middle bg-indigo opacity-25 rounded-circle"
        style={{ width: "320px", height: "320px", filter: "blur(120px)" }}
      ></div>

      <div className="bg-secondary bg-opacity-25 backdrop-blur p-4 p-md-5 rounded-4 border border-secondary shadow-lg w-100" style={{ maxWidth: "480px" }}>
        {/* Header Form */}
        <div className="text-center mb-4">
          <div className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-25 rounded-3 border border-primary border-opacity-25 mb-3" style={{ width: "64px", height: "64px" }}>
            <i className="fa-solid fa-shield-halved text-primary fs-2"></i>
          </div>
          <h2 className="fw-bold text-white text-uppercase fst-italic">
            Admin <span className="text-primary">Access</span>
          </h2>
          <p className="text-muted small mt-2">Please log in to manage the system</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-3 p-3 bg-danger bg-opacity-10 border-start border-danger text-danger small rounded animate-shake d-flex align-items-center gap-2">
            <i className="fa-solid fa-triangle-exclamation"></i>
            <span>
              {error.response?.data?.content ||
                error.message ||
                "Invalid username or password!"}
            </span>
          </div>
        )}

        <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
          {/* Username */}
          <div>
            <label className="form-label text-uppercase fw-bold small text-muted">
              Admin Username
            </label>
            <div className="position-relative">
              <i className="fa-solid fa-user-shield position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"></i>
              <input
                onBlur={validationForm}
                onChange={handleOnChange}
                name="taiKhoan"
                type="text"
                className="form-control ps-5 bg-dark text-white border border-secondary rounded-3"
                placeholder="Username..."
              />
            </div>
            {errors.taiKhoan && (
              <span className="text-danger small fst-italic">{errors.taiKhoan}</span>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="form-label text-uppercase fw-bold small text-muted">
              Password
            </label>
            <div className="position-relative">
              <i className="fa-solid fa-key position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"></i>
              <input
                onBlur={validationForm}
                onChange={handleOnChange}
                name="matKhau"
                type="password"
                className="form-control ps-5 bg-dark text-white border border-secondary rounded-3"
                placeholder="••••••••"
              />
            </div>
            {errors.matKhau && (
              <span className="text-danger small fst-italic">{errors.matKhau}</span>
            )}
          </div>

          {/* Login Button */}
          <button
            disabled={isDisableLogin}
            type="submit"
            className={`btn w-100 fw-bold text-uppercase fst-italic py-3 rounded-3 shadow ${
              isDisableLogin
                ? "btn-secondary disabled"
                : "btn-primary"
            }`}
          >
            {loading ? (
              <i className="fa-solid fa-circle-notch fa-spin"></i>
            ) : (
              <>
                <i className="fa-solid fa-right-to-bracket me-2"></i>
                Log in to system
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/")}
            className="btn btn-link text-uppercase fw-bold small text-muted"
          >
            <i className="fa-solid fa-arrow-left me-1"></i> Back to homepage
          </button>
        </div>
      </div>
    </div>
  );
}
