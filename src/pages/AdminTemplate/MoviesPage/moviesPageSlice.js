import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";

export const fetchListMovies = createAsyncThunk(
  "listMoviesPage/fetchListMoviesPage",
  async (__dirname, { rejectWithValue }) => {
    try {
      const result = await api.get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteMovie = createAsyncThunk(
  "listMoviesPage/deleteMovie",
  async (maPhim, { rejectWithValue }) => {
    try {
      const result = await api.delete(`/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
      return result.maPhim;
    } catch (error) {
      return rejectWithValue(error.result?.data || "Xóa phim thất bại!");
    }
  }
);

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const listMoviesPageSlice = createSlice({
  name: "listMoviesPageSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchListMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchListMovies.fulfilled, (state, action) => {
      (state.loading = false), (state.data = action.payload);
    });
    builder.addCase(fetchListMovies.rejected, (state, action) => {
      (state.loading = false), (state.error = action.payload);
    });
    builder.addCase(deleteMovie.fulfilled, (state, action) => {
      state.data = state.data.filter((item) => item.maPhim !== action.payload);
    });
  },
});

export default listMoviesPageSlice.reducer;
