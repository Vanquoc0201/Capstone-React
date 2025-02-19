import { fetchDetailMovie } from "./slice";
import { fetchShowtimesByMovie } from "../HomePage/cinemaSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function DetailMovie() {
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const movieState = useSelector((state) => state.detailMovieReducer);
  const { movieShowtimes, loading } = useSelector((state) => state.cinemaReducer);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [maLichChieu, setMaLichChieu] = useState(null);

  useEffect(() => {
    dispatch(fetchDetailMovie(id));
    dispatch(fetchShowtimesByMovie(id));
  }, [dispatch, id]);

  if (movieState.loading || loading) return <p>Loading...</p>;
  if (!movieState.data) return <p>Không tìm thấy phim!</p>;

  const { data } = movieState;

  const handleSelectShowtime = (lich) => {
    setSelectedShowtime(lich);
    setMaLichChieu(lich.maLichChieu);
  };

  return (
    <div className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-5">
        <h1 className="text-4xl font-bold text-center text-yellow-400 mb-6 uppercase">
          {data.tenPhim}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <img className="rounded-lg shadow-lg w-full max-w-sm" src={data.hinhAnh} alt={data.tenPhim} />
          </div>
          <div className="md:col-span-2 space-y-6">
            <p className="text-lg">{data.moTa}</p>
            <p>🎬 <strong>Ngày khởi chiếu:</strong> {new Date(data.ngayKhoiChieu).toLocaleDateString("vi-VN")}</p>
            <p>⭐ <strong>Đánh giá:</strong> {data.danhGia}/10</p>
            <Link
              to={maLichChieu ? `/booking/${maLichChieu}` : "#"}
              className={`px-3 text-lg font-bold rounded-lg shadow-md transition-all ${maLichChieu ? "bg-red-600 hover:bg-red-700" : "bg-gray-500 cursor-not-allowed"}`}
            >
              🎟 Mua vé ngay
            </Link>
          </div>
        </div>

        {/* Hiển thị lịch chiếu */}
        <div className="mt-6 bg-gray-800 p-5 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">Lịch Chiếu</h2>
          {movieShowtimes?.heThongRapChieu?.map((heThong) => (
            <div key={heThong.maHeThongRap} className="mb-4">
              <h3 className="text-lg font-semibold text-white">{heThong.tenHeThongRap}</h3>
              {heThong.cumRapChieu.map((cumRap) => (
                <div key={cumRap.maCumRap} className="mt-2">
                  <h4 className="text-md font-medium text-gray-300">{cumRap.tenCumRap}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {cumRap.lichChieuPhim.map((lich) => (
                      <button
                        key={lich.maLichChieu}
                        className={`p-3 rounded-md text-center ${selectedShowtime === lich ? "bg-yellow-400 text-black" : "bg-gray-700 text-white"}`}
                        onClick={() => handleSelectShowtime(lich)}
                      >
                        {new Date(lich.ngayChieuGioChieu).toLocaleDateString("vi-VN")} - {new Date(lich.ngayChieuGioChieu).toLocaleTimeString("vi-VN")}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
