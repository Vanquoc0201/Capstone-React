import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { createSelector } from "reselect";
const selectMovieState = (state) => state.listMovieReducer;
// Async action để lấy danh sách phim
export const fetchListMovie = createAsyncThunk(
  "listMoviePage/fetchListMovie",
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  loading: false,
  data: null,
  error: null,
  selectedFilter: "all", // Thêm state để lưu filter
};

const listMoviePageSlice = createSlice({
  name: "listMoviePageSlice",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.selectedFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchListMovie.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchListMovie.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchListMovie.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// Selector để lấy danh sách phim đã lọc
export const selectFilteredMovies = createSelector(
    [selectMovieState],
    (movieState) => {
      const { data, selectedFilter } = movieState;
      if (!data) return [];
  
      return data.filter((movie) => {
        if (selectedFilter === "all") return true;
        if (selectedFilter === "dangChieu") return movie.dangChieu;
        if (selectedFilter === "sapChieu") return movie.sapChieu;
        if (selectedFilter === "hot") return movie.hot;
        return false;
      });
    }
  );

export const { setFilter } = listMoviePageSlice.actions;
export default listMoviePageSlice.reducer;
