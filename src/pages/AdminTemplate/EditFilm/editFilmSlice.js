import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchEditFilm = createAsyncThunk(
  "editFilm/fetchEditFilm",
  async (maPhim, { rejectWithValue }) => {
    try {
      const result = await api.post("/QuanLyPhim/CapNhatPhimUpload", maPhim);
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
};

const editFilmPageSlice = createSlice({
  name: "editFilmPageSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEditFilm.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchEditFilm.fulfilled, (state, action) => {
      (state.loading = false), action.payload;
    });
    builder.addCase(fetchEditFilm.rejected, (state, action) => {
      (state.loading = false), action.payload;
    });
  },
});

export default editFilmPageSlice.reducer;
