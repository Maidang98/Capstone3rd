import { useState } from "react";
import { actAddUser } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

export default function AddUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.addUserReducer);

  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP01",
    maLoaiNguoiDung: "KhachHang",
    hoTen: "",
  });

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const hanldAddUser = async (e) => {
    e.preventDefault();
    
    const result = await dispatch(actAddUser(user));

    if (actAddUser.fulfilled.match(result)) {
      navigate("/admin/user");
    }
  };

  return (
    <div className="p-4 p-md-5 min-vh-100 d-flex flex-column bg-black text-white fade-in">
      {/* Container */}
      <div className="mx-auto p-4 p-md-5 bg-black border border-secondary shadow-lg rounded-4 fade-in w-100"
        style={{ maxWidth: "900px" }}
>
        
        {/* Header Section*/}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4">
          <div>
            <h2 className="fs-2 fw-bold text-uppercase text-danger">
              Add User
            </h2>
            <p className="text-white small">Create a new account for the system</p>
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
        <form onSubmit={hanldAddUser} className="row g-3">
          
          {/* Group Input */}
          {[
            { label: "Username", name: "taiKhoan", type: "text", placeholder: "Enter username" },
            { label: "Password", name: "matKhau", type: "password", placeholder: "Enter password" },
            { label: "Full Name", name: "hoTen", type: "text", placeholder: "Enter full name" },
            { label: "Phone Number", name: "soDt", type: "text", placeholder: "Enter phone number" },
            { label: "Email Address", name: "email", type: "email", placeholder: "Enter email" },
          ].map((field) => (
            <div key={field.name} className="col-12 col-md-6">
              <label className="form-label text-uppercase fw-bold small text-white">
                {field.label}
              </label>
              <input
                onChange={handleOnchange}
                name={field.name}
                type={field.type}
                required
                className="form-control bg-dark text-white border border-secondary rounded-3"
                placeholder={field.placeholder}
              />
            </div>
          ))}

          {/* Select Role */}
          <div className="col-12 col-md-6">
            <label className="form-label text-uppercase fw-bold small text-white">
              Role
            </label>
            <select
              name="maLoaiNguoiDung"
              onChange={handleOnchange}
              value={user.maLoaiNguoiDung}
              className="form-select bg-dark text-white border border-secondary rounded-3"
            >
              <option value="KhachHang">Customer</option>
              <option value="QuanTri">Administrator</option>
            </select>
          </div>

          {/* Button Submit*/}
          <div className="col-12 mt-3">
            <button
              type="submit"
              disabled={loading}
              className={`btn btn-primary w-100 fw-bold text-uppercase py-3 rounded-3 shadow ${loading ? "disabled opacity-50" : ""}`}
            >
              {loading ? "Processing..." : "Confirm Add New"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
