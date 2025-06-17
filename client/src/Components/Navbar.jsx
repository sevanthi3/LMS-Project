// src/Components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux/Slices/AuthSlice"; // ✅ Import logout thunk
import toast from "react-hot-toast"; // ✅ Import toast for notifications

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.data);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap(); // ✅ wait for logout to complete
      navigate("/"); // ✅ Redirect to homepage
    } catch (error) {
      // Extract meaningful error message
      let message = "Logout failed";
      if (error?.message) message = error.message;
      else if (error?.response?.data?.message) message = error.response.data.message;
      else message = JSON.stringify(error);

      console.error("Logout failed:", message);
      toast.error(message); // Show toast notification on error
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-slate-100 dark:bg-gray-900 text-gray-700 dark:text-white px-5 py-5 shadow-md font-saira text-3xl">
      <div className="max-w-7xl mx-auto flex items-center w-full justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-[#7e3af2]">
          LMS
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-14 text-xl">
          <Link to="/" className="hover:text-green-300 transition">Home</Link>
          <Link to="/courses" className="hover:text-green-300 transition">All Courses</Link>
          <Link to="/contact" className="hover:text-green-300 transition">Contact Us</Link>
          <Link to="/about" className="hover:text-green-300 transition">About Us</Link>
          {isLoggedIn && (
            <Link to="/user/profile" className="hover:text-green-300 transition">Profile</Link>
          )}
        </div>

        {/* Right side auth buttons */}
        <div className="hidden md:flex space-x-4 text-lg">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="hover:text-blue-500 text-[#bf4390]">Login</Link>
              <Link to="/signup" className="hover:text-blue-500 text-[#bf4390]">Signup</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="hover:text-red-500 text-[#cb1e1e]">
              Logout
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-blue-600 text-white font-semibold">
          <Link to="/" onClick={toggleMenu}>Home</Link>
          <Link to="/courses" onClick={toggleMenu}>All Courses</Link>
          <Link to="/contact" onClick={toggleMenu}>Contact Us</Link>
          <Link to="/about" onClick={toggleMenu}>About Us</Link>
          {isLoggedIn ? (
            <>
              <Link to="/user/profile" onClick={toggleMenu}>Profile</Link>
              <button
                onClick={() => {
                  toggleMenu();
                  handleLogout();
                }}
                className="block text-left text-red-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={toggleMenu} className="text-[#bf4390]">Login</Link>
              <Link to="/signup" onClick={toggleMenu} className="text-[#bf4390]">Signup</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
