import { configureStore } from "@reduxjs/toolkit";
import listMovieReducer from "./../pages/HomeTemplate/HomePage/slice"
import detailMovieReducer from "./../pages/HomeTemplate/DetailMovie/slice"
import cinemaReducer from "./../pages/HomeTemplate/HomePage/cinemaSlice"
export const store = configureStore({
    reducer: {
        listMovieReducer,
        detailMovieReducer,
        cinemaReducer,
    }
})