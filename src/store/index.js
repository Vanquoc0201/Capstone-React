import { configureStore } from "@reduxjs/toolkit";
import listMovieReducer from "./../pages/HomeTemplate/HomePage/slice";
import detailMovieReducer from "./../pages/HomeTemplate/DetailMovie/slice";
import cinemaReducer from "./../pages/HomeTemplate/HomePage/cinemaSlice";
import userReducer from "./../pages/HomeTemplate/Login/userSlice";
import authReducer from "../pages/AdminTemplate/AuthPage/authSlice";
import dashBoardReducer from "./../pages/AdminTemplate/DashboardPage/sliceDashBoard";
import listUsersPageReducer from "./../pages/AdminTemplate/UserPage/listUserSlice";
import listMoviesPageReducer from "./../pages/AdminTemplate/MoviesPage/moviesPageSlice";
import bookingTicketReducer from "./../pages/HomeTemplate/BookingTicket/slice";
import editFilmReducer from "./../pages/AdminTemplate/EditFilm/editFilmSlice";

export const store = configureStore({
  reducer: {
    listMovieReducer,
    detailMovieReducer,
    cinemaReducer,
    bookingTicketReducer,
    user: userReducer,
    authReducer,
    dashBoardReducer,
    listUsersPageReducer,
    listMoviesPageReducer,
    editFilmReducer,
  },
});
