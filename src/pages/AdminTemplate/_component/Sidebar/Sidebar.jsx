import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-5">
      <h2 className="text-2xl font-semibold text-center mb-8">
        Admin Dashboard
      </h2>
      <ul>
        <li className="mb-6">
          <Link
            to={"/admin/dashboard"}
            className="block hover:bg-gray-700 p-2 rounded"
          >
            Dashboard
          </Link>
        </li>
        <li className="mb-6">
          <Link
            to="/admin/userPage"
            className="block hover:bg-gray-700 p-2 rounded"
          >
            Quản lý người dùng
          </Link>
        </li>
        <li className="mb-6">
          <Link
            to="/admin/add-user"
            className="block hover:bg-gray-700 p-2 rounded"
          >
            Thêm người dùng
          </Link>
        </li>
        <li className="mb-6">
          <Link
            to="/admin/add-movie"
            className="block hover:bg-gray-700 p-2 rounded"
          >
            Thêm phim
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
