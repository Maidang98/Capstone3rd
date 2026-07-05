import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actFetchUsers, actDeleteUser } from "./slice";
import { Link } from "react-router-dom";
import SearchBar from "../_components/SearchBar";

export default function UserManager() {
  const dispatch = useDispatch();
  const { listUser, loading } = useSelector((state) => state.userReducer || { listUser: [] });
  
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    dispatch(actFetchUsers());
  }, [dispatch]);

  const handleDelete = (username) => {
    if (window.confirm(`Are you sure you want to delete account ${username}?`)) {
      dispatch(actDeleteUser(username));
    }
  };

  const filteredUsers = listUser?.filter((user) => {
    const searchLow = keyword.toLowerCase().trim();
    return (
      user.taiKhoan.toLowerCase().includes(searchLow) ||
      user.hoTen.toLowerCase().includes(searchLow)
    );
  });

  return (
    <div className="p-4 p-md-5 min-vh-100 d-flex flex-column bg-black text-white fade-in">
      {/* Header */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4">
        <div>
          <h2 className="fs-2 fw-bold text-uppercase text-danger">
            Manage Users
          </h2>
          <p className="text-white small">Manage accounts and system roles</p>
        </div>

        {/* Search Bar */}
        <div className="w-100 w-lg-auto flex-grow-1" style={{ maxWidth: "400px" }}>
          <SearchBar onSearch={(val) => setKeyword(val)} />
        </div>

        <Link
          to="/admin/user/add-user"
          className="btn btn-danger fw-bold shadow d-flex align-items-center gap-2"
        >
          <i className="fa-solid fa-user-plus"></i> Add User
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 bg-secondary bg-opacity-25 border border-secondary rounded-4 overflow-hidden shadow-lg mt-3">
        <div className="overflow-auto flex-grow-1">
          {loading ? (
            <div className="d-flex flex-column align-items-center justify-content-center py-5 gap-3">
              <div className="spinner-border text-danger"></div>
              <p className="text-muted fw-bold small text-uppercase">Synchronizing data...</p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="table-responsive d-none d-lg-block">
                <table className="table table-dark table-hover align-middle mb-0">
                  <thead className="table-secondary text-uppercase small">
                    <tr>
                      <th className="fw-bold">Username</th>
                      <th className="fw-bold">Full Name</th>
                      <th className="fw-bold">Email</th>
                      <th className="fw-bold">Phone</th>
                      <th className="fw-bold">Role</th>
                      <th className="fw-bold text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers?.map((user) => (
                      <tr key={user.taiKhoan}>
                        <td className="fw-bold text-primary">{user.taiKhoan}</td>
                        <td className="fw-semibold text-white">{user.hoTen}</td>
                        <td className="text-white">{user.email}</td>
                        <td className="text-white">{user.soDT}</td>
                        <td>
                          <span className={`badge ${user.maLoaiNguoiDung === 'QuanTri' ? 'bg-danger' : 'bg-secondary'}`}>
                            {user.maLoaiNguoiDung}
                          </span>
                        </td>
                        <td className="text-center">
                          <div className="d-flex justify-content-center gap-2">
                            <Link
                              to={`/admin/user/edit/${user.taiKhoan}`}
                              className="btn btn-sm btn-outline-primary"
                              title="Edit"
                            >
                              <i className="fa-solid fa-user-gear"></i>
                            </Link>
                            <button
                              onClick={() => handleDelete(user.taiKhoan)}
                              className="btn btn-sm btn-outline-danger"
                              title="Delete"
                            >
                              <i className="fa-solid fa-trash-can"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile & Tablet Cards */}
              <div className="d-lg-none">
                {filteredUsers?.map((user) => (
                  <div key={user.taiKhoan} className="p-3 border-bottom border-secondary">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <p className="text-primary fw-bold">{user.taiKhoan}</p>
                        <p className="fw-semibold text-white">{user.hoTen}</p>
                      </div>
                      <span className={`badge ${user.maLoaiNguoiDung === 'QuanTri' ? 'bg-purple' : 'bg-secondary'}`}>
                        {user.maLoaiNguoiDung}
                      </span>
                    </div>
                    <div className="text-white small mt-2">
                      <p><i className="fa-solid fa-envelope me-2"></i>{user.email}</p>
                      <p><i className="fa-solid fa-phone me-2"></i>{user.soDT}</p>
                    </div>
                    <div className="d-flex gap-2 pt-2 border-top border-secondary mt-2">
                      <Link
                        to={`/admin/user/edit/${user.taiKhoan}`}
                        className="btn btn-sm btn-outline-primary flex-grow-1"
                      >
                        <i className="fa-solid fa-user-gear"></i> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(user.taiKhoan)}
                        className="btn btn-sm btn-outline-danger flex-grow-1"
                      >
                        <i className="fa-solid fa-trash-can"></i> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
