import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListUsers } from "./listUserSlice";

export default function UserPage() {
  const state = useSelector((state) => state.listUsersPageReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchListUsers());
  }, []);

  const renderListUsers = () => {
    const { data } = state;
    return data?.map((user) => (
      <tr
        key={user.taiKhoan}
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
      >
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {user.taiKhoan}
        </th>
        <td className="px-6 py-4">{user.hoTen}</td>
        <td className="px-6 py-4">{user.email}</td>
        <td className="px-6 py-4">{user.soDT}</td>
        <td className="px-6 py-4">
          <span
            className={
              user.maLoaiNguoiDung === "KhachHang"
                ? "text-green-500"
                : "text-red-500"
            }
          >
            {user.maLoaiNguoiDung}
          </span>
        </td>
        <td className="px-6 py-4">
          <a
            href="#"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Edit
          </a>
        </td>
      </tr>
    ));
  };
  return (
    <div className="container mx-auto">
      <h1 className="text-center text-red-500 text-4xl mb-5">Users Page</h1>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Fullname
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone number
              </th>
              <th scope="col" className="px-6 py-3">
                Type User
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>{renderListUsers()}</tbody>
        </table>
      </div>
    </div>
  );
}
