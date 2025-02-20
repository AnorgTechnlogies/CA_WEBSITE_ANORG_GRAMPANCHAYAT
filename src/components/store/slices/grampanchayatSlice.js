import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const grampanchayatAuthSlice = createSlice({
  name: "grampanchayatAuth",
  initialState: {
    loading: false,
    error: null,
    isAuthenticated: false,
    grampanchayat: null,
    token: null,
    message: null,
  },
  reducers: {
    loginGrampanchayatRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    loginGrampanchayatSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.grampanchayat = action.payload.existingGrampanchayat;
      state.token = action.payload.token;
      state.message = action.payload.message;
      state.error = null;
    },
    loginGrampanchayatFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.grampanchayat = null;
      state.token = null;
      state.error = action.payload;
      state.message = null;
    },
    logoutGrampanchayatRequest(state) {
      state.loading = true;
    },
    logoutGrampanchayatSuccess(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.grampanchayat = null;
      state.token = null;
      state.message = "Logged out successfully";
      state.error = null;
    },
    logoutGrampanchayatFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    loadGrampanchayatRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loadGrampanchayatSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.grampanchayat = action.payload;
      state.error = null;
    },
    loadGrampanchayatFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.grampanchayat = null;
      state.error = action.payload;
    },
    clearGrampanchayatErrors(state) {
      state.error = null;
    },
    clearGrampanchayatMessages(state) {
      state.message = null;
    },
  },
});

const BASE_URL = import.meta.env.VITE_API_KEY;

// Login Grampanchayat action
export const loginGrampanchayat = (gstNo, grampanchayatPassword) => async (dispatch) => {
  console.log("gstNo, grampanchayatPassword : ", gstNo, grampanchayatPassword);
  
  try {
    dispatch(grampanchayatAuthSlice.actions.loginGrampanchayatRequest());
    
    const response = await axios.post(
      `${BASE_URL}/api/grampanchayat/login`,
      { gstNo, grampanchayatPassword },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    
    localStorage.setItem("grampanchayatToken", response.data.token);
    
    dispatch(
      grampanchayatAuthSlice.actions.loginGrampanchayatSuccess(response.data)
    );
  } catch (error) {
    dispatch(
      grampanchayatAuthSlice.actions.loginGrampanchayatFailed(
        error.response?.data?.message || "Login failed! Please try again."
      )
    );
  }
};

// Get Grampanchayat action
export const getGrampanchayat = () => async (dispatch) => {
  dispatch(grampanchayatAuthSlice.actions.loadGrampanchayatRequest());
  try {
    const { data } = await axios.get(`${BASE_URL}/api/grampanchayat/getGrampanchayat`, {
      withCredentials: true,
    });
    console.log(data);
    dispatch(grampanchayatAuthSlice.actions.loadGrampanchayatSuccess(data.existingGrampanchayat));
    dispatch(grampanchayatAuthSlice.actions.clearGrampanchayatErrors());
  } catch (error) {
    dispatch(grampanchayatAuthSlice.actions.loadGrampanchayatFailed(error.response?.data?.message || "Failed to load grampanchayat data"));
  }
};

// Logout Grampanchayat action
export const logoutGrampanchayat = () => async (dispatch) => {
  dispatch(grampanchayatAuthSlice.actions.logoutGrampanchayatRequest());
  try {
    const { data } = await axios.get(`${BASE_URL}/api/grampanchayat/logout`, {
      withCredentials: true,
    });
    console.log(data, "data in logout page");
    localStorage.removeItem("grampanchayatToken");
    dispatch(grampanchayatAuthSlice.actions.logoutGrampanchayatSuccess());
  } catch (error) {
    dispatch(grampanchayatAuthSlice.actions.logoutGrampanchayatFailed(
      error.response?.data?.message || "Logout failed"
    ));
  }
};

// Clear all errors
export const clearGrampanchayatErrors = () => (dispatch) => {
  dispatch(grampanchayatAuthSlice.actions.clearGrampanchayatErrors());
};

// Clear messages
export const clearGrampanchayatMessages = () => (dispatch) => {
  dispatch(grampanchayatAuthSlice.actions.clearGrampanchayatMessages());
};

export default grampanchayatAuthSlice.reducer;