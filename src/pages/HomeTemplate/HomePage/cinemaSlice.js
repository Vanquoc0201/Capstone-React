import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";

// Async thunk lấy danh sách hệ thống rạp
export const fetchCinemaSystems = createAsyncThunk(
  "cinema/fetchCinemaSystems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/QuanLyRap/LayThongTinHeThongRap");
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Lỗi khi lấy hệ thống rạp");
    }
  }
);

// Async thunk lấy danh sách cụm rạp theo hệ thống
export const fetchCinemaClusters = createAsyncThunk(
  "cinema/fetchCinemaClusters",
  async (maHeThongRap, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
      );
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Lỗi khi lấy cụm rạp");
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  cinemaSystems: [],
  cinemaClusters: [],
  selectedSystem: null, // Hệ thống rạp đang chọn
};

const cinemaSlice = createSlice({
  name: "cinema",
  initialState,
  reducers: {
    setSelectedSystem: (state, action) => {
      state.selectedSystem = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Lấy hệ thống rạp
      .addCase(fetchCinemaSystems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCinemaSystems.fulfilled, (state, action) => {
        state.loading = false;
        state.cinemaSystems = action.payload;
      })
      .addCase(fetchCinemaSystems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Lấy cụm rạp theo hệ thống
      .addCase(fetchCinemaClusters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCinemaClusters.fulfilled, (state, action) => {
        state.loading = false;
        state.cinemaClusters = action.payload;
      })
      .addCase(fetchCinemaClusters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedSystem } = cinemaSlice.actions;
export default cinemaSlice.reducer;