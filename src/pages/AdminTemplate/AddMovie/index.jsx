import { useState } from "react";
import api from "../../../services/api";

export default function AddMoviePage() {
  const [movieData, setMovieData] = useState({
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

  // Hàm lấy giá trị yyyy-mm-dd từ input date
  const handleDateChange = (e) => {
    const dateValue = e.target.value; // Lấy giá trị từ input
    setMovieData((prev) => ({ ...prev, ngayKhoiChieu: dateValue })); // Cập nhật state đúng cách
  };

  // Chuyển đổi định dạng từ yyyy-mm-dd sang dd/mm/yyyy
  const formatDate = (newDate) => {
    if (!newDate || !newDate.includes("-")) return ""; // Kiểm tra nếu dữ liệu không hợp lệ
    const [year, month, day] = newDate.split("-");
    return `${day}/${month}/${year}`;
  };

  // Nút thay đổi trạng thái của checkbox
  const toggleMovieStatus = (e) => {
    const { name, checked } = e.target;
    setMovieData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // Lấy giá trị của value và name
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData({
      ...movieData,
      [name]: value,
    });
  };

  // Lấy giá trị hình ảnh
  const handleImageChange = (e) => {
    if (e.target.files) {
      console.log(e.target.files[0]);
      setMovieData({ ...movieData, hinhAnh: e.target.files[0] });
    }
  };

  // Post dữ liệu API lên server
  const addMovie = async (formData) => {
    try {
      const result = await api.post(
        "/QuanLyPhim/ThemPhimUploadHinh",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Dữ liệu phim:", result.data);
      return result.data;
    } catch (error) {
      console.log("Lỗi khi lấy dữ liệu phim", error);
      return null;
    }
  };

  // Chức năng nút submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("tenPhim", movieData.tenPhim);
    formData.append("moTa", movieData.moTa);
    formData.append("ngayKhoiChieu", formatDate(movieData.ngayKhoiChieu));
    formData.append("sapChieu", movieData.sapChieu);
    formData.append("dangChieu", movieData.dangChieu);
    formData.append("hot", movieData.hot);
    formData.append("danhGia", movieData.danhGia);
    formData.append("maPhim", 10);
    formData.append("hinhAnh", movieData.hinhAnh);
    try {
      const result = await addMovie(formData);
      if (result) alert("Thêm phim thành công");
      window.location.reload();
    } catch (error) {
      alert("Lỗi khi thêm phim: " + error);
    }
  };
  return (
    <div>
      {/* Added padding to the main container */}
      <div className="container mx-auto bg-white rounded-lg p-8 shadow-md">
        {/* Added container styling */}
        <h1 className="text-3xl font-bold mb-4">Thêm phim mới</h1>
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
        <form onSubmit={handleSubmit} className="space-y-4">
          {" "}
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
              value={movieData.tenPhim}
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
              value={movieData.trailer}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label
              htmlFor="moTa"
              className="block text-gray-700 font-bold mb-2"
            >
              Mô tả:
            </label>
            <textarea
              id="moTa"
              name="moTa"
              value={movieData.moTa}
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
                  checked={movieData.dangChieu}
                  onChange={toggleMovieStatus}
                />

                <div
                  className={`w-14 h-7 rounded-full shadow-inner transition duration-300 ${
                    movieData.dangChieu ? "bg-blue-500" : "bg-gray-300"
                  }`}
                />

                <div
                  className={`absolute left-0 w-7 h-7 bg-white rounded-full shadow-md transition-transform duration-300 ${
                    movieData.dangChieu ? "translate-x-7" : "translate-x-0"
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
                  checked={movieData.sapChieu}
                  onChange={toggleMovieStatus}
                />

                <div
                  className={`w-14 h-7 rounded-full shadow-inner transition duration-300 ${
                    movieData.sapChieu ? "bg-blue-500" : "bg-gray-300"
                  }`}
                />

                <div
                  className={`absolute left-0 w-7 h-7 bg-white rounded-full shadow-md transition-transform duration-300 ${
                    movieData.sapChieu ? "translate-x-7" : "translate-x-0"
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
                  checked={movieData.hot}
                  onChange={toggleMovieStatus}
                />

                <div
                  className={`w-14 h-7 rounded-full shadow-inner transition duration-300 ${
                    movieData.hot ? "bg-blue-500" : "bg-gray-300"
                  }`}
                />

                <div
                  className={`absolute left-0 w-7 h-7 bg-white rounded-full shadow-md transition-transform duration-300 ${
                    movieData.hot ? "translate-x-7" : "translate-x-0"
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
              value={movieData.ngayKhoiChieu}
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
              value={movieData.danhGia}
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
              Lưu phim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
