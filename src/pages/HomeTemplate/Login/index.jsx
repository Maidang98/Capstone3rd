import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { fetchLogin } from "./slice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.loginReducer);

  const [user, setUser] = useState({ taiKhoan: "", matKhau: "" });
  const [erros, setErros] = useState({ taiKhoan: "", matKhau: "" });

  const isDisableLogin = !user.taiKhoan || !user.matKhau || erros.taiKhoan || erros.matKhau;

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const validationForm = (event) => {
    const { name, value } = event.target;
    setErros({
      ...erros,
      [name]: value.trim() === "" ? "Please fill in all information <3" : "",
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(fetchLogin(user))
      .unwrap()
      .then((result) => {
        localStorage.setItem("USER_LOGIN", JSON.stringify(result));
        alert("Welcome back, " + result.hoTen + "!");
        if (result.maLoaiNguoiDung === "QuanTri") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-dark position-relative p-4">
      {/* Blur effect */}
      <div className="position-absolute top-0 start-0 rounded-circle bg-danger bg-opacity-25" 
           style={{width:"18rem",height:"18rem",filter:"blur(100px)"}}></div>
      <div className="position-absolute bottom-0 end-0 rounded-circle bg-danger bg-opacity-25" 
           style={{width:"18rem",height:"18rem",filter:"blur(100px)"}}></div>

      <div className="bg-dark bg-opacity-75 p-4 p-sm-5 rounded shadow-lg border border-secondary w-100" style={{maxWidth:"28rem"}}>
        
        {/* Back button */}
        <Link to="/" className="d-inline-flex align-items-center text-secondary mb-3 text-decoration-none">
          <i className="fa-solid fa-arrow-left me-2"></i> Back
        </Link>

        <div className="text-center mb-4">
          <h2 className="fw-bold text-uppercase text-white">
            Log <span className="text-danger">In</span>
          </h2>
          <p className="text-secondary small">Welcome back to our cinema system</p>
        </div>

        {error && (
          <div className="alert alert-danger small d-flex align-items-center">
            <i className="fa-solid fa-circle-exclamation me-2"></i> {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
          {/* Username */}
          <div>
            <label className="form-label text-danger fw-bold small">Username</label>
            <div className="position-relative">
              <i className="fa-regular fa-user position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"></i>
              <input
                onBlur={validationForm}
                onChange={handleOnChange}
                name="taiKhoan"
                type="text"
                placeholder="Enter username..."
                className="form-control ps-5 bg-dark text-white border-secondary"
              />
            </div>
            {erros.taiKhoan && <small className="text-danger fst-italic">{erros.taiKhoan}</small>}
          </div>

          {/* Password */}
          <div>
            <label className="form-label text-danger fw-bold small">Password</label>
            <div className="position-relative">
              <i className="fa-solid fa-lock position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"></i>
              <input
                onBlur={validationForm}
                onChange={handleOnChange}
                name="matKhau"
                type="password"
                placeholder="••••••••"
                className="form-control ps-5 bg-dark text-white border-secondary"
              />
            </div>
            {erros.matKhau && <small className="text-danger fst-italic">{erros.matKhau}</small>}
          </div>

          <button
            disabled={isDisableLogin || loading}
            type="submit"
            className={`btn fw-bold text-uppercase ${isDisableLogin || loading ? "btn-secondary" : "btn-danger"}`}
          >
            {loading ? (
              <span className="d-flex align-items-center justify-content-center gap-2">
                <i className="fa-solid fa-circle-notch fa-spin"></i> Processing...
              </span>
            ) : "Log in now"}
          </button>
        </form>

        <div className="mt-4 pt-3 border-top border-secondary text-center">
          <p className="text-secondary small">
            Don't have an account?{" "}
            <Link to="/register" className="text-danger fw-bold text-decoration-underline">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
