import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

export const actLogin = createAsyncThunk(
  "auth/actLogin",
  async (user, { rejectWithValue }) => {
    try {
      const result = await api.post("/QuanLyNguoiDung/DangNhap", user);
      /**
       * Check permission user
       * - Nếu là KhachHang => show error
       * - Nếu là QuanTri => ...
       */
      const userInfo = result.data.content;
      if (userInfo.maLoaiNguoiDung === "KhachHang") {
        return rejectWithValue({
          response: {
            data: {
              content: "Không có quyền truy cập admin!",
            },
          },
        });
      }

      /**
       * 1. Save userInfo to local storage
       * 2. Redirect to dashboard
       */
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  loading: false,
  data: userInfo,
  error: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    actLogout: (state) => {
      state.data = null;
      state.error = null;
      // Xóa thông tin người dùng khỏi localStorage
      localStorage.removeItem("userInfo");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(actLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(actLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { actLogout } = authSlice.actions;
export default authSlice.reducer;
