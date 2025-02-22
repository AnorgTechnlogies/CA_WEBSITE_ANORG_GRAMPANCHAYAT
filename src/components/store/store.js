import { configureStore } from "@reduxjs/toolkit";
import grampanchayatReducer from "./slices/grampanchayatSlice";
import grampanchayatDashboardReducer from "./slices/gpDashboardData"


export const store = configureStore({
  reducer: {
    grampanchayatAuth: grampanchayatReducer,
    grampanchayatDashboard : grampanchayatDashboardReducer,
  },
});
