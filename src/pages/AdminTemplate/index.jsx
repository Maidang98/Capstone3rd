import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import AdminHeader from "./_components/Header";
import AdminFooter from "./_components/Footer";

export default function AdminTemplate() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data } = useSelector((state) => state.authReducer);

  if (!data) return <Navigate to="/login" />;
  if (data.maLoaiNguoiDung !== "QuanTri") {
    alert("You do not have permission to access the Admin page!");
    return <Navigate to="/" />;
  }

  return (
    <div className="d-flex min-vh-100 bg-dark text-white">
      <div className="flex-grow-1 d-flex flex-column">
        {/* HEADER */}
        <AdminHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        {/* CONTENT */}
        <main className="flex-grow-1 p-4 bg-black">
          <div className="mx-auto" style={{ maxWidth: "1300px" }}>
            <Outlet />
          </div>
        </main>

        {/* FOOTER */}
        <AdminFooter />
      </div>
    </div>
  );
}
