import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosUserInstance } from "../../Helpers/axiosInstance"; // ✅ Corrected import
import toast from "react-hot-toast";

const initialState = {
  allUsersCount: 0,
  subscribedCount: 0,
};

// Get stats data
export const getStatsData = createAsyncThunk("stats/get", async () => {
  const loadingId = toast.loading("Getting the stats...");
  try {
    const response = await axiosUserInstance.get("/admin/stats/users");
    toast.success(response?.data?.message, { id: loadingId });
    return response?.data;
  } catch (error) {
    toast.error("Failed to get stats", { id: loadingId });
    throw error;
  }
});

const statSlice = createSlice({
  name: "stat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStatsData.fulfilled, (state, action) => {
      state.allUsersCount = action?.payload?.allUsersCount || 0;
      state.subscribedCount = action?.payload?.subscribedUsersCount || 0;
    });
  },
});

export default statSlice.reducer;
