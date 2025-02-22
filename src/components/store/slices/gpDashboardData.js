import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_KEY;

const initialState = {
  loading: false,
  error: null,
  dashboardData: {
    gst: { records: [], totalAmount: 0, count: 0 },
    insurance: { records: [], totalAmount: 0, count: 0 },
    it: { records: [], totalAmount: 0, count: 0 },
    kamgar: { records: [], totalAmount: 0, count: 0 },
    royalty: { records: [], totalAmount: 0, count: 0 },
    summary: { totalRecords: 0, grandTotal: 0 }
  }
};

const grampanchayatDashboardSlice = createSlice({
  name: "grampanchayatDashboard",
  initialState,
  reducers: {
    fetchDashboardDataRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDashboardDataSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.dashboardData = action.payload;
    },
    fetchDashboardDataFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearDashboardData(state) {
      state.dashboardData = initialState.dashboardData;
    },
    clearErrors(state) {
      state.error = null;
    }
  }
});

// Action to fetch Grampanchayat dashboard data
export const fetchGrampanchayatDashboardData = () => async (dispatch) => {
  try {
    dispatch(grampanchayatDashboardSlice.actions.fetchDashboardDataRequest());
    
    const config = {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    };
    
    const response = await axios.get(
      `${BASE_URL}/api/grampanchayat/getGrampanchayatData`,
      config
    );
    
    dispatch(
      grampanchayatDashboardSlice.actions.fetchDashboardDataSuccess(response.data.data)
    );
  } catch (error) {
    dispatch(
      grampanchayatDashboardSlice.actions.fetchDashboardDataFailed(
        error.response?.data?.message || "Error fetching dashboard data!"
      )
    );
  }
};

// Action to clear dashboard data (e.g., when user logs out)
export const clearGrampanchayatDashboardData = () => (dispatch) => {
  dispatch(grampanchayatDashboardSlice.actions.clearDashboardData());
};

// Action to clear errors
export const clearGrampanchayatDashboardErrors = () => (dispatch) => {
  dispatch(grampanchayatDashboardSlice.actions.clearErrors());
};

export default grampanchayatDashboardSlice.reducer;