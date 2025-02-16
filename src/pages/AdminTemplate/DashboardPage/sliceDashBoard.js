import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";

export const fetchDashBoardData = createAsyncThunk(
  "dashboard/fetchListDashBoard",
  async (__dirname, { rejectWithValue }) => {
    try {
      const result = await api.get("/QuanLyRap/LayThongTinHeThongRap");
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

const listDashBoardSlice = createSlice({
  name: "listDashBoardSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDashBoardData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDashBoardData.fulfilled, (state, action) => {
      (state.loading = false), (state.data = action.payload);
    });
    builder.addCase(fetchDashBoardData.rejected, (state, action) => {
      (state.loading = false), (state.error = action.payload);
    });
  },
});

export default listDashBoardSlice.reducer;
