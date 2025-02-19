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
          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer hover:bg-gray-700 p-2 rounded">
              Phim
              <span className="transition-transform duration-300 group-open:rotate-180">
                ▼
              </span>
            </summary>
            <ul className="ml-4 mt-2">
              <li className="mb-2">
                <Link
                  to="/admin/moviesPage"
                  className="block hover:bg-gray-700 p-2 rounded"
                >
                  📜 Danh sách phim
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/add-movie"
                  className="block hover:bg-gray-700 p-2 rounded"
                >
                  ➕ Thêm phim
                </Link>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
