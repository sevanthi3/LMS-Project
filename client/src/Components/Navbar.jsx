import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux/Slices/AuthSlice";
import toast from "react-hot-toast";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.data);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate("/");
    } catch (error) {
      let message = "Logout failed";
      if (error?.message) message = error.message;
      else if (error?.response?.data?.message) message = error.response.data.message;
      else message = JSON.stringify(error);

      console.error("Logout failed:", message);
      toast.error(message);
    }
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-slate-100 dark:bg-gray-900 text-gray-700 dark:text-white px-5 py-5 shadow-md font-saira text-3xl">
      <div className="max-w-7xl mx-auto flex items-center w-full justify-between">
        <Link to="/" className="text-2xl font-bold text-[#7e3af2]">LMS</Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-14 text-xl">
          <Link to="/" className="hover:text-green-300 transition">Home</Link>
          <Link to="/courses" className="hover:text-green-300 transition">All Courses</Link>
          <Link to="/search" className="hover:text-green-300 transition">Find Tutors</Link>
          <Link to="/contact" className="hover:text-green-300 transition">Contact Us</Link>
          <Link to="/about" className="hover:text-green-300 transition">About Us</Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex space-x-4 text-lg">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="hover:text-blue-500 text-[#bf4390]">Login</Link>
              <Link to="/signup" className="hover:text-blue-500 text-[#bf4390]">Signup</Link>
            </>
          ) : (
            <>
              {user?.role === "admin" ? (
                <Link to="/admin" className="hover:text-green-600">Dashboard</Link>
              ) : (
                <Link to="/user/profile" className="hover:text-green-600">Profile</Link>
              )}
              <button onClick={handleLogout} className="hover:text-red-500 text-[#cb1e1e]">Logout</button>
            </>
          )}
        </div>

        {/* Hamburger Menu */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-blue-600 text-white font-semibold">
          <Link to="/" onClick={toggleMenu}>Home</Link>
          <Link to="/courses" onClick={toggleMenu}>All Courses</Link>
          <Link to="/search" onClick={toggleMenu}>Find Tutors</Link>
          <Link to="/contact" onClick={toggleMenu}>Contact Us</Link>
          <Link to="/about" onClick={toggleMenu}>About Us</Link>

          {isLoggedIn && (
            user?.role === "admin" ? (
              <Link to="/admin" onClick={toggleMenu}>Dashboard</Link>
            ) : (
              <Link to="/user/profile" onClick={toggleMenu}>Profile</Link>
            )
          )}

          {isLoggedIn ? (
            <button
              onClick={() => {
                toggleMenu();
                handleLogout();
              }}
              className="block text-left text-red-200"
            >
              Logout
            </button>
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
