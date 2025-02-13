import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useRef } from "react";
import Movie from "./movie";
import { fetchListMovie, setFilter, selectFilteredMovies } from "./slice";
import { fetchCinemaSystems, fetchCinemaClusters, setSelectedSystem } from "./cinemaSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HomePage() {
  const dispatch = useDispatch();
  
  const { loading: loadingMovies } = useSelector((state) => state.listMovieReducer);
  const filteredMovies = useSelector(selectFilteredMovies);
  const selectedFilter = useSelector((state) => state.listMovieReducer.selectedFilter);

  const { cinemaSystems, cinemaClusters, selectedSystem, loading: loadingCinemas } = useSelector((state) => state.cinemaReducer);

  // Chỉ fetch dữ liệu khi component mount
  useEffect(() => {
    dispatch(fetchListMovie());
    dispatch(fetchCinemaSystems());
  }, [dispatch]);

  // Dùng useRef để tránh re-render nếu chọn cùng một hệ thống rạp
  const selectedSystemRef = useRef(null);
  const handleSelectSystem = (maHeThongRap) => {
    if (selectedSystemRef.current !== maHeThongRap) {
      selectedSystemRef.current = maHeThongRap;
      dispatch(setSelectedSystem(maHeThongRap));
      dispatch(fetchCinemaClusters(maHeThongRap));
    }
  };

  // Ghi nhớ danh sách cụm rạp, tránh render lại
  const memoizedClusters = useMemo(() => cinemaClusters, [cinemaClusters]);

  return (
    <div className="container mx-auto mt-5">
      {/* Banner */}
      <div className="mb-10">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop
          className="rounded-lg shadow-lg"
        >
          {filteredMovies.slice(0, 10).map((movie) => (
            <SwiperSlide key={movie.maPhim} className="relative">
              <div className="relative w-full h-[400px]">
                <img
                  src={movie.hinhAnh}
                  alt={movie.tenPhim}
                  className="max-w-[90%] h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg"></div>
                <div className="absolute bottom-5 left-5 text-white">
                  <h2 className="text-3xl font-bold">{movie.tenPhim}</h2>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Thanh lọc phim */}
      <div className="flex justify-center gap-5 mb-8">
        {["all", "dangChieu", "sapChieu", "hot"].map((filter) => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-lg border ${
              selectedFilter === filter ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
            }`}
            onClick={() => dispatch(setFilter(filter))}
          >
            {filter === "all"
              ? "🎥 Tất cả"
              : filter === "dangChieu"
              ? "🎬 Đang chiếu"
              : filter === "sapChieu"
              ? "⏳ Sắp chiếu"
              : "🔥 Phim HOT"}
          </button>
        ))}
      </div>

      {/* Danh sách phim */}
      <h1 className="text-2xl font-bold mb-5">Danh sách phim</h1>
      <div className="grid grid-cols-4 gap-5">
        {loadingMovies ? <p>Loading phim...</p> : filteredMovies.map((movie) => <Movie key={movie.maPhim} movie={movie} />)}
      </div>

      {/* Hệ thống rạp */}
      <div className="container mx-auto mt-5">
        <h1 className="text-2xl font-bold mb-5">Chọn hệ thống rạp</h1>
        <div className="flex gap-5">
          {cinemaSystems.map((system) => (
            <button
              key={system.maHeThongRap}
              className={`px-4 py-2 rounded-lg border ${
                selectedSystem === system.maHeThongRap ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
              }`}
              onClick={() => handleSelectSystem(system.maHeThongRap)}
            >
              {system.tenHeThongRap}
            </button>
          ))}
        </div>

        {selectedSystem && (
          <div className="mt-5">
            <h2 className="text-xl font-bold">Cụm rạp thuộc hệ thống {selectedSystem}</h2>
            {loadingCinemas ? (
              <p>Đang tải cụm rạp...</p>
            ) : (
              <ul>
                {memoizedClusters.map((cluster) => (
                  <li key={cluster.maCumRap} className="mt-2">
                    {cluster.tenCumRap} - {cluster.diaChi}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
