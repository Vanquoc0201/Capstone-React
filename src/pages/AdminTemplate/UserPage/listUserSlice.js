import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";

export const fetchListUsers = createAsyncThunk(
  "listUsersPage/fetchListUsers",
  async (__dirname, { rejectWithValue }) => {
    try {
      const result = await api.get(
        "/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01"
      );
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const putUser = createAsyncThunk(
  "listUsersPage/putUser",
  async (userData, { rejectWithValue }) => {
    try {
      const result = await api.put(
        "/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        userData
      );
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error.result?.data);
    }
  }
);

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const listUsersPageSlice = createSlice({
  name: "listUsersPageSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchListUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchListUsers.fulfilled, (state, action) => {
      (state.loading = false), (state.data = action.payload);
    });
    builder.addCase(fetchListUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Put user
    builder.addCase(putUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(putUser.fulfilled, (state, action) => {
      state.loading = false;
      // Cập nhật danh sách người dùng với người dùng mới được thêm
      state.data.push(action.payload);
    });
    builder.addCase(putUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default listUsersPageSlice.reducer;
