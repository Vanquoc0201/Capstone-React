import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authData = useSelector((state) => state.authReducer.data);

  if (!authData) {
    return <Navigate to="/auth" />;
  }
  const handleLogout = () => {
    dispatch(actLogout());
    navigate("/auth");
  };
  return (
    <div className="w-full bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div>
        <button
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleLogout}
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Topbar;
