import { configureStore } from "@reduxjs/toolkit";
import grampanchayatReducer from "./slices/grampanchayatSlice";


export const store = configureStore({
  reducer: {
    grampanchayatAuth: grampanchayatReducer,
  },
});
