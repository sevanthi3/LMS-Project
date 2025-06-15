import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosCourseInstance } from "../../Helpers/axiosInstance"; // ✅ FIXED
import toast from "react-hot-toast";

const initialState = {
  lectures: [],
};

// Get lectures for a specific course
export const getCourseLectures = createAsyncThunk("/courses/lecture/get", async (id) => {
  const loadingId = toast.loading("Fetching Lectures...");
  try {
    const res = await axiosCourseInstance.get(`/courses/${id}`); // ✅ FIXED
    toast.success("Lectures Fetched Successfully", { id: loadingId });
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message, { id: loadingId });
    throw error;
  }
});

// Add course lecture for a specific course
export const addCourseLecture = createAsyncThunk("/courses/lecture/add", async (data) => {
  const loadingId = toast.loading("Adding Lecture...");
  try {
    const res = await axiosCourseInstance.post(`/courses/${data.id}`, data.formData); // ✅ FIXED
    toast.success("Lecture Added Successfully", { id: loadingId });
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message, { id: loadingId });
    throw error;
  }
});

// Delete course lecture for a specific course
export const deleteCourseLecture = createAsyncThunk("/courses/lecture/delete", async (data) => {
  const loadingId = toast.loading("Deleting Lecture...");
  try {
    const res = await axiosCourseInstance.delete(
      `/courses?courseId=${data.courseId}&lectureId=${data.lectureId}` // ✅ FIXED
    );
    toast.success("Lecture Deleted Successfully", { id: loadingId });
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message, { id: loadingId });
    throw error;
  }
});

const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get Course Lectures
    builder.addCase(getCourseLectures.fulfilled, (state, action) => {
      state.lectures = action?.payload?.course?.lectures || [];
    });

    // Add Course Lecture
    builder.addCase(addCourseLecture.fulfilled, (state, action) => {
      state.lectures = action?.payload?.course?.lectures || [];
    });

    // Delete Course Lecture
    builder.addCase(deleteCourseLecture.fulfilled, (state, action) => {
      state.lectures = action?.payload?.course?.lectures || [];
    });
  },
});

export default lectureSlice.reducer;
