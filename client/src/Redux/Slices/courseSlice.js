import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosCourseInstance } from "../../Helpers/axiosInstance";

const initialState = {
  coursesData: [],
  loading: false,
  error: null
};

// ✅ Fetch all courses
export const getAllCourses = createAsyncThunk("/courses/get", async (_, thunkAPI) => {
  const loadingMessage = toast.loading("Fetching courses...");
  try {
    const res = await axiosCourseInstance.get("/");
    toast.success(res?.data?.message, { id: loadingMessage });
    return res?.data?.courses;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to fetch courses", {
      id: loadingMessage,
    });
    return thunkAPI.rejectWithValue(error?.response?.data?.message);
  }
});

// ✅ Delete a course
export const deleteCourse = createAsyncThunk("/courses/delete", async (courseId, thunkAPI) => {
  const loadingMessage = toast.loading("Deleting course...");
  try {
    const res = await axiosCourseInstance.delete(`/delete/${courseId}`);
    toast.success(res?.data?.message || "Course deleted", { id: loadingMessage });
    return courseId;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Delete failed", { id: loadingMessage });
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
});

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.coursesData = action.payload;
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default courseSlice.reducer;
