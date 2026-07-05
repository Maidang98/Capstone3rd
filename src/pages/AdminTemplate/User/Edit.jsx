import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actUpdateUser } from "./slice";
import api from "../../../services/api";

export default function EditUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userAdmin = localStorage.getItem("USER_ADMIN");
  const token = userAdmin ? JSON.parse(userAdmin).accessToken : null;
  
  const { username, id } = useParams();
  const accountToEdit = username || id; 

  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    email: "",
    soDt: "",
    maLoaiNguoiDung: "KhachHang",
    maNhom: "GP01",
  });

  useEffect(() => {
    const fetchUserDetail = async () => {
      if (!accountToEdit) return;

      try {
        const result = await api.post(
          "QuanLyNguoiDung/LayThongTinNguoiDung",
          { taiKhoan: accountToEdit },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = result.data.content;
        
        setUser({
          taiKhoan: data.taiKhoan,
          matKhau: data.matKhau,
          hoTen: data.hoTen,
          email: data.email,
          soDt: data.soDT,
          maLoaiNguoiDung: data.maLoaiNguoiDung,
          maNhom: data.maNhom,
        });
      } catch (error) {
        console.error("Error fetching user info:", error);
        alert("Unable to load user information!");
      }
    };

    fetchUserDetail();
  }, [accountToEdit]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const payload = {
      taiKhoan: user.taiKhoan || accountToEdit,
      matKhau: user.matKhau,
      hoTen: user.hoTen,
      email: user.email,
      soDt: user.soDt,
      maLoaiNguoiDung: user.maLoaiNguoiDung,
      maNhom: "GP01",
    };

    if (!payload.matKhau) {
      alert("Please enter a password!");
      return;
    }

    const resultAction = await dispatch(actUpdateUser(payload));
    
    if (actUpdateUser.fulfilled.match(resultAction)) {
      navigate("/admin/user");
    }
  };

  return (
    <div className="p-4 p-md-5 min-vh-100 d-flex flex-column bg-black text-white fade-in">
      <div className="mx-auto p-4 p-md-5 bg-black border border-secondary shadow-lg rounded-4 fade-in w-100" style={{ maxWidth: "900px" }}>
        
        {/* Header Section */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4">
          <div>
            <h2 className="fs-2 fw-bold text-uppercase text-danger">
              Update User
            </h2>
            <p className="text-white small">Modify system user information</p>
          </div>
          <button
          type="button"
          className="btn btn-outline-light rounded-pill px-3"
          onClick={() => navigate(-1)}
        >
          <i className="fa-solid fa-arrow-left me-2"></i>
          Back
        </button>
        </div>

        {/* Form */}
        <form onSubmit={handleUpdate} className="row g-3">
          
          {/* Username */}
          <div className="col-12 col-md-6">
            <label className="form-label text-uppercase fw-bold small text-white">Username (Not editable)</label>
            <input
              type="text"
              name="taiKhoan"
              value={user.taiKhoan}
              disabled
              className="form-control bg-dark text-muted rounded-3"
            />
          </div>

          {/* Password */}
          <div className="col-12 col-md-6">
            <label className="form-label text-uppercase fw-bold small text-white">Password</label>
            <input
              type="password"
              name="matKhau"
              value={user.matKhau}
              onChange={handleOnChange}
              required
              className="form-control bg-dark text-white border border-secondary rounded-3"
            />
          </div>

          {/* Full Name */}
          <div className="col-12 col-md-6">
            <label className="form-label text-uppercase fw-bold small text-white">Full Name</label>
            <input
              type="text"
              name="hoTen"
              value={user.hoTen}
              onChange={handleOnChange}
              className="form-control bg-dark text-white border border-secondary rounded-3"
            />
          </div>

          {/* Phone Number */}
          <div className="col-12 col-md-6">
            <label className="form-label text-uppercase fw-bold small text-white">Phone Number</label>
            <input
              type="text"
              name="soDt"
              value={user.soDt}
              onChange={handleOnChange}
              className="form-control bg-dark text-white border border-secondary rounded-3"
            />
          </div>

          {/* Email */}
          <div className="col-12 col-md-6">
            <label className="form-label text-uppercase fw-bold small text-white">Email Address</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleOnChange}
              className="form-control bg-dark text-white border border-secondary rounded-3"
            />
          </div>

          {/* Role */}
          <div className="col-12 col-md-6">
            <label className="form-label text-uppercase fw-bold small text-white">Role</label>
            <select
              name="maLoaiNguoiDung"
              value={user.maLoaiNguoiDung}
              onChange={handleOnChange}
              className="form-select bg-dark text-white border border-secondary rounded-3"
            >
              <option value="KhachHang">Customer</option>
              <option value="QuanTri">Administrator</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="col-12 mt-3">
            <button
              type="submit"
              className="btn btn-primary w-100 fw-bold text-uppercase d-flex align-items-center justify-content-center gap-2"
            >
              <i className="fa-solid fa-check"></i> Confirm Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
