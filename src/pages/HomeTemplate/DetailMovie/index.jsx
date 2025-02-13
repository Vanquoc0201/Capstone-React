import { fetchDetailMovie } from "./slice"
import { useSelector,useDispatch } from "react-redux"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
export default function DetaiMovie() {
    const state = useSelector((state)=>state.detailMovieReducer)
    console.log("Redux State:", state);
    const dispatch = useDispatch();
    const {id} = useParams();
    const {data} = state;
    // console.log(data);
    
    useEffect(() => {
      dispatch(fetchDetailMovie(id));
    }, [dispatch, id]);
    
    if(state.loading) return <p>Loading...</p>
    if (!data) return <p>Không tìm thấy phim!</p>;
  return (
    <div className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-5">
        {/* Tiêu đề */}
        <h1 className="text-4xl font-bold text-center text-yellow-400 mb-6 uppercase">
          {data.tenPhim}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cột 1: Hình ảnh */}
          <div className="flex flex-col items-center">
            <img
              className="rounded-lg shadow-lg w-full max-w-sm"
              src={data.hinhAnh}
              alt={data.tenPhim}
            />
          </div>

          {/* Cột 2: Nội dung phim */}
          <div className="md:col-span-2 space-y-6">
            <p className="text-lg">{data.moTa}</p>

            <p>
              🎬 <strong>Ngày khởi chiếu:</strong>{" "}
              {new Date(data.ngayKhoiChieu).toLocaleDateString("vi-VN")}
            </p>
            <p>⭐ <strong>Đánh giá:</strong> {data.danhGia}/10</p>

            {/* Trạng thái phim */}
            <div className="flex gap-4 ">
              {data.dangChieu && (
                <span className="px-4 py-2 bg-green-500 text-white text-sm font-bold rounded-lg">
                  Đang chiếu
                </span>
              )}
              {data.sapChieu && (
                <span className="px-4 py-2 bg-yellow-500 text-black text-sm font-bold rounded-lg">
                  Sắp chiếu
                </span>
              )}
              {data.hot && (
                <span className="px-4 py-2 bg-red-500 text-white text-sm font-bold rounded-lg">
                  HOT
                </span>
              )}
            </div>

            {/* Nút mua vé */}
            <Link
              to={`/booking/${data.maPhim}`}
              className="bg-red-600 hover:bg-red-700 px-6 py-3 text-lg font-bold rounded-lg shadow-md transition-all "
            >
              🎟 Mua vé ngay
            </Link>
          </div>
        </div>

        {/* Trailer */}
        <div className="mt-10 flex justify-center">
          <iframe
            className="w-full max-w-3xl h-80 rounded-lg shadow-lg"
            src={data.trailer.replace("watch?v=", "embed/")}
            title="Trailer"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  )
}
