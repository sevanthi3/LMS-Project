import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto p-8 mt-10 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold text-violet-700 mb-6 text-center font-righteous">
        Admin Dashboard
      </h1>

      <div className="grid sm:grid-cols-2 gap-6">
        {/* View All Bookings */}
        <button
          onClick={() => navigate("/admin/bookings")}
          className="bg-violet-600 text-white py-4 rounded-lg font-semibold hover:bg-violet-700 transition"
        >
          📘 View All Bookings
        </button>

        {/* View All Tutors */}
        <button
          onClick={() => navigate("/admin/tutors")}
          className="bg-violet-600 text-white py-4 rounded-lg font-semibold hover:bg-violet-700 transition"
        >
          👩‍🏫 View All Tutors
        </button>

        {/* ✅ Manage Students */}
        <button
          onClick={() => navigate("/admin/manage-students")}
          className="bg-violet-600 text-white py-4 rounded-lg font-semibold hover:bg-violet-700 transition"
        >
          🧑‍🎓 Manage Students
        </button>
      </div>
    </div>
  );
}
