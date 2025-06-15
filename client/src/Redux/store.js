import { configureStore } from "@reduxjs/toolkit";

// Reducers
import AuthSliceReducer from "./Slices/AuthSlice";
import CourseSliceReducer from "./Slices/courseSlice";
import RazorpaySliceReducer from "./Slices/RazorpaySlice";
import LectureSliceReducer from "./Slices/LectureSlice";
import StatSliceReducer from "./Slices/StatSlice";
import userReducer from "./Slices/userSlice"; // ✅ correct path and import

// Create Redux Store
const store = configureStore({
  reducer: {
    auth: AuthSliceReducer,
    course: CourseSliceReducer,
    razorpay: RazorpaySliceReducer,
    lecture: LectureSliceReducer,
    stat: StatSliceReducer,
    user: userReducer, // ✅ added user slice here
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
