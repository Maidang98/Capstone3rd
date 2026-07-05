import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { fetchRegister, resetRegisterState } from "./slice";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, success } = useSelector((state) => state.registerReducer);

  const [user, setUser] = useState({ taiKhoan: "", matKhau: "", hoTen: "", email: "", soDt: "" });
  const [erros, setErros] = useState({ taiKhoan: "", matKhau: "", hoTen: "", email: "", soDt: "" });

  const isDisableRegister = Object.values(user).some(val => val === "") || Object.values(erros).some(val => val !== "");

  useEffect(() => {
    dispatch(resetRegisterState());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      alert("Registration successful! Please log in.");
      navigate("/login");
    }
  }, [success, navigate]);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const validationForm = (event) => {
    const { name, value } = event.target;
    let mess = value.trim() === "" ? "Please do not leave blank" : "";
    setErros({ ...erros, [name]: mess });
  };

  const handleRegister = (event) => {
    event.preventDefault();
    dispatch(fetchRegister(user));
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-dark position-relative p-4">
      {/* Blur effect */}
      <div className="position-absolute top-0 start-0 rounded-circle bg-danger bg-opacity-25"
           style={{width:"24rem",height:"24rem",filter:"blur(120px)"}}></div>
      <div className="position-absolute bottom-0 end-0 rounded-circle bg-primary bg-opacity-25"
           style={{width:"24rem",height:"24rem",filter:"blur(120px)"}}></div>

      <div className="bg-dark bg-opacity-75 p-4 p-sm-5 rounded shadow-lg border border-secondary w-100" style={{maxWidth:"40rem"}}>
        
        {/* Back button */}
        <Link to="/" className="d-inline-flex align-items-center text-secondary mb-3 text-decoration-none">
          <i className="fa-solid fa-arrow-left me-2"></i> Back to Home
        </Link>

        <div className="text-center mb-4">
          <h2 className="fw-bold text-uppercase text-white">
            Register <span className="text-danger">Member</span>
          </h2>
          <p className="text-secondary small">Become a member to enjoy the best movie offers</p>
        </div>

        {error && (
          <div className="alert alert-danger small d-flex align-items-center">
            <i className="fa-solid fa-circle-exclamation me-2"></i> {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="row g-3">
          {/* Full Name */}
          <div className="col-12">
            <label className="form-label text-danger fw-bold small">Full Name</label>
            <input onBlur={validationForm} onChange={handleOnChange} name="hoTen" type="text"
                   placeholder="Enter your full name..."
                   className="form-control bg-dark text-white border-secondary"/>
            {erros.hoTen && <small className="text-danger fst-italic">{erros.hoTen}</small>}
          </div>

          {/* Username */}
          <div className="col-md-6">
            <label className="form-label text-danger fw-bold small">Username</label>
            <input onBlur={validationForm} onChange={handleOnChange} name="taiKhoan" type="text"
                   placeholder="Enter username..."
                   className="form-control bg-dark text-white border-secondary"/>
            {erros.taiKhoan && <small className="text-danger fst-italic">{erros.taiKhoan}</small>}
          </div>

          {/* Password */}
          <div className="col-md-6">
            <label className="form-label text-danger fw-bold small">Password</label>
            <input onBlur={validationForm} onChange={handleOnChange} name="matKhau" type="password"
                   placeholder="••••••••"
                   className="form-control bg-dark text-white border-secondary"/>
            {erros.matKhau && <small className="text-danger fst-italic">{erros.matKhau}</small>}
          </div>

          {/* Email */}
          <div className="col-md-6">
            <label className="form-label text-danger fw-bold small">Email</label>
            <input onBlur={validationForm} onChange={handleOnChange} name="email" type="email"
                   placeholder="example@mail.com"
                   className="form-control bg-dark text-white border-secondary"/>
            {erros.email && <small className="text-danger fst-italic">{erros.email}</small>}
          </div>

          {/* Phone Number */}
          <div className="col-md-6">
            <label className="form-label text-danger fw-bold small">Phone Number</label>
            <input onBlur={validationForm} onChange={handleOnChange} name="soDt" type="text"
                   placeholder="090 123 4567"
                   className="form-control bg-dark text-white border-secondary"/>
            {erros.soDt && <small className="text-danger fst-italic">{erros.soDt}</small>}
          </div>

          {/* Register Button */}
          <div className="col-12">
            <button disabled={isDisableRegister || loading} type="submit"
                    className={`btn w-100 fw-bold text-uppercase ${isDisableRegister || loading ? "btn-secondary" : "btn-danger"}`}>
              {loading ? (
                <span className="d-flex align-items-center justify-content-center gap-2">
                  <i className="fa-solid fa-circle-notch fa-spin"></i> Registering...
                </span>
              ) : "Complete Registration"}
            </button>
          </div>
        </form>

        <div className="mt-4 pt-3 border-top border-secondary text-center">
          <p className="text-secondary small">
            Already have an account?{" "}
            <Link to="/login" className="text-danger fw-bold text-decoration-underline">
              Log in now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
