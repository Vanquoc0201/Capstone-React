import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListUsers, putUser } from "./listUserSlice";

export default function UserPage() {
  const state = useSelector((state) => state.listUsersPageReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchListUsers());
  }, [dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectUser] = useState(null);

  const handleEdit = (user) => {
    setIsModalOpen(true);
    setSelectUser(user);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [editUser, setEditUser] = useState(null);

  const handleChangeEdit = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const handleUpdateUser = () => {
    dispatch(putUser(editUser));
    setIsModalOpen(false);
  };

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
          <button
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            onClick={() => {
              handleEdit(user);
            }}
          >
            Edit
          </button>
        </td>
      </tr>
    ));
  };
  return (
    <div className="container mx-auto">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-5">
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

      {/* Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">Edit User: {selectedUser.taiKhoan}</h2>
            <div>
              <label>Fullname:</label>
              <input
                type="text"
                defaultValue={selectedUser.hoTen}
                className="border p-2 rounded mb-4 w-full"
                onChange={handleChangeEdit}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                defaultValue={selectedUser.email}
                className="border p-2 rounded mb-4 w-full"
                onChange={handleChangeEdit}
              />
            </div>
            <div>
              <label>Phone number:</label>
              <input
                type="text"
                defaultValue={selectedUser.soDT}
                className="border p-2 rounded mb-4 w-full"
                onChange={handleChangeEdit}
              />
            </div>
            <div>
              <label>Type User:</label>
              <select
                defaultValue={selectedUser.maLoaiNguoiDung}
                className="border p-2 rounded mb-4 w-full"
                onChange={handleChangeEdit}
              >
                <option value="KhachHang">Khách Hàng</option>
                <option value="QuanTri">Quản Trị</option>
              </select>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={() => handleCloseModal()}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded"
                onClick={handleUpdateUser}
              >
                Save Changes
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded"
                onClick={() => handleCloseModal()}
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
