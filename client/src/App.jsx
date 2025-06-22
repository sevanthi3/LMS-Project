import { Routes, Route } from "react-router-dom";

// Layout
import Layout from "./Layout/Layout";

// Common Pages
import HomePage from "./Pages/HomePage";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Feedback from "./Pages/Feedback/Feedback";


// Courses
import CourseList from "./Pages/courses/CourseList";
import CourseDetail from "./Pages/courses/CourseDetails";
import CourseDescription from "./Pages/courses/CourseDescription";
import CreateCourse from "./Pages/courses/CreateCourse";

// User
import Profile from "./Pages/User/Profile";
import ChangePassword from "./Pages/Password/ChangePassword";
import StudentLogin from "./Components/auth/studentLogin";



// Tutors
import SearchTutors from "./Pages/SearchTutors/SearchTutors";
import TutorProfile from "./Pages/TutorProfile/TutorProfile";

// Lesson Scheduling
import ScheduleLesson from "./Pages/ScheduleLesson/ScheduleLesson";
import MyBookings from "./Pages/MyBookings/MyBookings";
import BookLesson from "./Pages/BookLesson/BookLesson";

// Admin Pages
import AdminDashboard from "./Pages/admin/AdminsDashboard";
import AllBookings from "./Pages/admin/AllBookings";
import AllTutors from "./Pages/admin/AllTutors";
import ManageStudents from "./Pages/admin/ManageStudents";
import PaymentPage from "./Pages/Payment/PaymentPage";
import PaymentSuccess from "./Pages/Payment/PaymentSuccess";
import AdminLogin from "./Pages/admin/adminLogin";

// // Payment Pages ✅
// import PaymentPage from "./Pages/Payment/PaymentPage";
// import PaymentSuccess from "./Pages/Payment/PaymentSuccess";
// import PaymentFail from "./Pages/Payment/PaymentFail";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Common */}
        <Route index element={<HomePage />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="/feedback/:id" element={<Feedback />} />


        {/* Courses */}
        <Route path="courses" element={<CourseList />} />
        <Route path="course/:id" element={<CourseDescription />} />
        <Route path="courses/:id" element={<CourseDetail />} />
        <Route path="admin/create-course" element={<CreateCourse />} />

        {/* User */}
        <Route path="user/profile" element={<Profile />} />
        <Route path="user/profile/change-password" element={<ChangePassword />} />
        <Route path="/student-login" element={<StudentLogin />} />


        {/* Tutors */}
        <Route path="search" element={<SearchTutors />} />
        <Route path="tutor/:id" element={<TutorProfile />} />

        {/* Lesson Booking */}
        <Route path="schedule-lesson" element={<ScheduleLesson />} />
        <Route path="course/:id/feedback" element={<Feedback />} />
        <Route path="user/bookings" element={<MyBookings />} />
        <Route path="/book/tutor/:id" element={<BookLesson />} />

        {/* Admin Routes */}
       <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/bookings" element={<AllBookings />} />
        <Route path="/admin/tutors" element={<AllTutors />} />
        <Route path="admin/manage-students" element={<ManageStudents />} /> {/* ✅ FIXED TAG */}
        <Route path="payment" element={<PaymentPage />} />
        <Route path="payment/success" element={<PaymentSuccess />} />

        {/* Payment Routes ✅
        <Route path="payment" element={<PaymentPage />} />
        <Route path="payment/success" element={<PaymentSuccess />} />
        <Route path="payment/fail" element={<PaymentFail />} /> */}

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <h1 className="text-center py-10 text-red-500 text-xl">
              404 - Page Not Found
            </h1>
          }
        />
      </Route>
    </Routes>
  );
}
