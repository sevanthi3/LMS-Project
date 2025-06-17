import { Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import HomePage from "./Pages/HomePage";
import CourseDescription from "./Pages/courses/CourseDescription";
import CreateCourse from "./Pages/courses/CreateCourse";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard";
import Profile from "./Pages/User/Profile";
import CourseList from "./Pages/courses/CourseList";
import CourseDetail from "./Pages/courses/CourseDetails"; 
import ChangePassword from "./Pages/Password/ChangePassword";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="courses" element={<CourseList />} />
        <Route path="course/:id" element={<CourseDescription />} />
        <Route path="admin/create-course" element={<CreateCourse />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        {/* Add this route for user profile */}
        <Route path="user/profile" element={<Profile />} />
        <Route path="user/profile/change-password" element={<ChangePassword />} /> {/* ✅ ADD THIS */}


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
