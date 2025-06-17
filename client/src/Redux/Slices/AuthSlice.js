import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosUserInstance } from "../../Helpers/axiosInstance";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  role: localStorage.getItem("role") || "",
  data: JSON.parse(localStorage.getItem("data")) || {},
};

// 🔐 Signup
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  const loadingMessage = toast.loading("Creating your account...");
  try {
    const res = await axiosUserInstance.post("/register", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    toast.success(res?.data?.message, { id: loadingMessage });
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Registration failed", { id: loadingMessage });
    throw error;
  }
});

// 🔐 Login
export const login = createAsyncThunk("/auth/login", async (data, thunkAPI) => {
  try {
    const res = await axiosUserInstance.post("/login", data, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// 🔐 Logout
export const logout = createAsyncThunk("/auth/logout", async () => {
  const loadingMessage = toast.loading("Logging out...");
  try {
    const res = await axiosUserInstance.get("/logout", {
      withCredentials: true,
    });
    toast.success(res?.data?.message, { id: loadingMessage });
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Logout failed", { id: loadingMessage });
    throw error;
  }
});

// 🧑‍💼 Get Profile
export const getUserData = createAsyncThunk("/auth/user/me", async () => {
  const loadingMessage = toast.loading("Fetching profile...");
  try {
    const res = await axiosUserInstance.get("/me", {
      withCredentials: true,
    });
    toast.success(res?.data?.message, { id: loadingMessage });
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Could not fetch profile", { id: loadingMessage });
    throw error;
  }
});

// 🧑‍💼 Update Profile
// ✅ src/Redux/Slices/AuthSlice.jsx or wherever you have it

export const updateUserData = createAsyncThunk(
  "/auth/user/update",
  async ({ formData }, thunkAPI) => {
    const loadingMessage = toast.loading("Updating profile...");
    try {
      const res = await axiosUserInstance.put(`/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      toast.success(res?.data?.message || "Profile updated", { id: loadingMessage });
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Profile update failed", { id: loadingMessage });
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action.payload.user));
        localStorage.setItem("role", action.payload.user.role);
        localStorage.setItem("isLoggedIn", true);
        state.data = action.payload.user;
        state.role = action.payload.user.role;
        state.isLoggedIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action.payload.user));
        localStorage.setItem("role", action.payload.user.role);
        localStorage.setItem("isLoggedIn", true);
        state.data = action.payload.user;
        state.role = action.payload.user.role;
        state.isLoggedIn = true;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.removeItem("data");
        localStorage.removeItem("role");
        localStorage.removeItem("isLoggedIn");
        state.data = {};
        state.role = "";
        state.isLoggedIn = false;
      })
      .addCase(logout.rejected, (state) => {
        toast.error("Logout failed. Clearing session locally.");
        localStorage.removeItem("data");
        localStorage.removeItem("role");
        localStorage.removeItem("isLoggedIn");
        state.data = {};
        state.role = "";
        state.isLoggedIn = false;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action.payload.user));
        localStorage.setItem("role", action.payload.user.role);
        localStorage.setItem("isLoggedIn", true);
        state.data = action.payload.user;
        state.role = action.payload.user.role;
        state.isLoggedIn = true;
      })
      // Handle updateUserData lifecycle
      .addCase(updateUserData.pending, (state) => {
        // Optional: set loading state if you want
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action.payload.user));
        localStorage.setItem("role", action.payload.user.role);
        localStorage.setItem("isLoggedIn", true);
        state.data = action.payload.user;
        state.role = action.payload.user.role;
        state.isLoggedIn = true;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        // Optional: handle error state if needed
      });
  },
});

export default authSlice.reducer;
