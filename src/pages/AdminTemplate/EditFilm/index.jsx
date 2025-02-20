import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchEditFilm } from "./editFilmSlice";

function EditFilm() {
  const { maPhim } = useParams;
  const { data } = useSelector((state) => state.editFilmReducer);
  const dispatch = useDispatch();

  const [updateFilm, setUpdateFilm] = useState({
    tenPhim: "",
    trailer: "",
    moTa: "",
    ngayKhoiChieu: "",
    dangChieu: false,
    sapChieu: false,
    hot: false,
    danhGia: 0,
    hinhAnh: null,
  });

  useEffect(() => {
    dispatch(fetchEditFilm(maPhim));
  }, [dispatch, maPhim]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateFilm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleMovieStatus = (e) => {
    const { name, checked } = e.target;
    setUpdateFilm({ ...updateFilm, [name]: checked });
  };

  const handleDateChange = () => {};

  const handleImageChange = () => {};

  const handleSubmit = () => {};
  return (
    <div className="container mx-auto bg-white rounded-lg p-8 shadow-md">
      {/* Added container styling */}
      <h1 className="text-3xl font-bold mb-4">Update film</h1>
      <div className="mb-4 flex items-center">
        <label className="mr-2">Form Size:</label>
        <button className="bg-white hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded mr-2 border">
          Small
        </button>
        <button className="bg-white hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded mr-2 border">
          Default
        </button>
        <button className="bg-white hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded border">
          Large
        </button>
      </div>
      <form
        //   onSubmit={handleSubmit}
        className="space-y-4"
      >
        {/* Added spacing between form elements */}
        <div>
          <label
            htmlFor="tenPhim"
            className="block text-gray-700 font-bold mb-2"
          >
            Tên phim:
          </label>
          <input
            type="text"
            id="tenPhim"
            name="tenPhim"
            defaultValue={updateFilm.tenPhim}
            value={updateFilm.tenPhim}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label
            htmlFor="trailer"
            className="block text-gray-700 font-bold mb-2"
          >
            Trailer:
          </label>
          <input
            type="text"
            id="trailer"
            name="trailer"
            defaultValue={updateFilm.trailer}
            value={updateFilm.trailer}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="moTa" className="block text-gray-700 font-bold mb-2">
            Mô tả:
          </label>
          <textarea
            id="moTa"
            name="moTa"
            defaultValue={updateFilm.moTa}
            value={updateFilm.moTa}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24" // Changed to textarea and added height
          />
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center">
            <label htmlFor="dangChieu" className="mr-2 cursor-pointer">
              Đang chiếu:
            </label>

            <label
              htmlFor="dangChieu"
              className="relative flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                id="dangChieu"
                className="hidden peer"
                name="dangChieu"
                defaultValue={updateFilm.dangChieu}
                checked={updateFilm.dangChieu}
                onChange={toggleMovieStatus}
              />

              <div
                className={`w-14 h-7 rounded-full shadow-inner transition duration-300 ${
                  updateFilm.dangChieu ? "bg-blue-500" : "bg-gray-300"
                }`}
              />

              <div
                className={`absolute left-0 w-7 h-7 bg-white rounded-full shadow-md transition-transform duration-300 ${
                  updateFilm.dangChieu ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </label>
          </div>
          <div className="flex items-center">
            <label htmlFor="sapChieu" className="mr-2">
              Sắp chiếu:
            </label>
            <label
              htmlFor="sapChieu"
              className="relative flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                id="sapChieu"
                className="hidden peer"
                name="sapChieu"
                defaultValue={updateFilm.sapChieu}
                checked={updateFilm.sapChieu}
                onChange={toggleMovieStatus}
              />

              <div
                className={`w-14 h-7 rounded-full shadow-inner transition duration-300 ${
                  updateFilm.sapChieu ? "bg-blue-500" : "bg-gray-300"
                }`}
              />

              <div
                className={`absolute left-0 w-7 h-7 bg-white rounded-full shadow-md transition-transform duration-300 ${
                  updateFilm.sapChieu ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </label>
          </div>
          <div className="flex items-center">
            <label htmlFor="hot" className="mr-2">
              Hot:
            </label>
            <label
              htmlFor="hot"
              className="relative flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                id="hot"
                className="hidden peer"
                name="hot"
                defaultValue={updateFilm.hot}
                checked={updateFilm.hot}
                onChange={toggleMovieStatus}
              />

              <div
                className={`w-14 h-7 rounded-full shadow-inner transition duration-300 ${
                  updateFilm.hot ? "bg-blue-500" : "bg-gray-300"
                }`}
              />

              <div
                className={`absolute left-0 w-7 h-7 bg-white rounded-full shadow-md transition-transform duration-300 ${
                  updateFilm.hot ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </label>
          </div>
        </div>
        <div>
          <label
            htmlFor="ngayKhoiChieu"
            className="block text-gray-700 font-bold mb-2"
          >
            Ngày khởi chiếu:
          </label>
          <input
            type="date"
            id="ngayKhoiChieu"
            name="ngayKhoiChieu"
            defaultValue={updateFilm.ngayKhoiChieu}
            value={updateFilm.ngayKhoiChieu}
            onChange={handleDateChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label
            htmlFor="danhGia"
            className="block text-gray-700 font-bold mb-2"
          >
            Số sao:
          </label>
          <input
            type="number"
            id="danhGia"
            name="danhGia"
            defaultValue={updateFilm.danhGia}
            value={updateFilm.danhGia}
            onChange={handleChange}
            min={1}
            max={10}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label
            htmlFor="hinhAnh"
            className="block text-gray-700 font-bold mb-2"
          >
            Hình ảnh:
          </label>
          <input
            accept=".jpg, .jpeg, .png"
            type="file"
            id="hinhAnh"
            name="hinhAnh"
            defaultValue={updateFilm.hinhAnh}
            onChange={handleImageChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mt-6">
          {" "}
          {/* Added margin top */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditFilm;
