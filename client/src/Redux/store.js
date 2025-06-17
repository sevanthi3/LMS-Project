// Reducers
import AuthSliceReducer from "./Slices/AuthSlice";
import CourseSliceReducer from "./Slices/courseSlice"; // ✅ correct
import RazorpaySliceReducer from "./Slices/RazorpaySlice";
import LectureSliceReducer from "./Slices/LectureSlice";
import StatSliceReducer from "./Slices/StatSlice";
import userReducer from "./Slices/userSlice";

// Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: AuthSliceReducer,
    course: CourseSliceReducer,
    razorpay: RazorpaySliceReducer,
    lecture: LectureSliceReducer,
    stats: StatSliceReducer,
    user: userReducer,
  },
});

export default store;
