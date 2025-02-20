import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListMovies, deleteMovie } from "./moviesPageSlice";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function MoviesPage() {
  const state = useSelector((state) => state.listMoviesPageReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchListMovies());
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (maPhim) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa phim này không?")) {
      dispatch(deleteMovie(maPhim));
      dispatch(fetchListMovies());
    }
  };
  const renderListMoviesPage = () => {
    const { data } = state;
    // Lấy dữ liệu chữ hoa thường cho thanh tìm kiếm
    const filteredMovies = data?.filter((item) =>
      item.tenPhim.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filteredMovies?.map((item) => (
      <tr
        key={item.maPhim}
        className="bg-white border-b h-20 dark:bg-gray-800 dark:border-gray-700 border-gray-200"
      >
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {item.maPhim}
        </th>
        <td className="px-6 py-4 w-24">
          <img src={item.hinhAnh} alt="" className="w-20 h-auto object-cover" />
        </td>
        <td className="px-6 py-4 text-center">{item.tenPhim}</td>
        <td className="px-6 py-4 w-96 ">{item.moTa}</td>
        <td className="px-6 py-4">
          <button className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition">
            <Link to={`/admin/edit-film/${item.maPhim}`}>Chỉnh sửa</Link>
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition ml-3"
            onClick={() => {
              handleDelete(item.maPhim);
            }}
          >
            Xóa
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col">
        <button
          data-modal-target="crud-modal"
          data-modal-toggle="crud-modal"
          className="block w-32 m-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          <Link to="/admin/add-movie">Thêm phim</Link>
        </button>

        <div className="flex">
          <input
            type="text"
            placeholder="Tìm kiếm tên phim..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className="border p-2 rounded w-64"
          />
          <a href="">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="ml-2 text-gray-500"
            />
          </a>
        </div>
      </div>

      {/* Table listFilm */}
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Mã phim
              </th>
              <th scope="col" className="px-6 py-3">
                Hình ảnh
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Tên phim
              </th>
              <th scope="col" className="px-6 py-3">
                Mô tả
              </th>
              <th scope="col" className="px-6 py-3">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>{renderListMoviesPage()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default MoviesPage;
