import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// ✅ All Tutors Included
const dummyTutors = [
  {
    id: 1,
    name: "Dr. Arjun Kumar",
    subject: "Full Stack Development (MERN)",
    price: "₹700/hr",
  },
  {
    id: 2,
    name: "Ms. Divya Ramesh",
    subject: "Frontend (HTML, CSS, React)",
    price: "₹600/hr",
  },
  {
    id: 3,
    name: "Mr. Rakesh Menon",
    subject: "Backend (Node.js, MongoDB)",
    price: "₹650/hr",
  },
  {
    id: 4,
    name: "Ms. Anjali Sinha",
    subject: "UI/UX & Tailwind CSS",
    price: "₹550/hr",
  },
  {
    id: 5,
    name: "Mr. Rahul Verma",
    subject: "DSA + System Design",
    price: "₹500/hr",
  },
  {
    id: 6,
    name: "Ms. Priya Mohan",
    subject: "DevOps + Cloud (AWS)",
    price: "₹700/hr",
  },
];

export default function BookLesson() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tutor = dummyTutors.find((t) => t.id === parseInt(id));

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleProceedToPayment = (e) => {
    e.preventDefault();

    // Redirect to payment page with tutor + lesson data
    navigate("/payment", {
      state: {
        tutorId: tutor.id,
        tutorName: tutor.name,
        subject: tutor.subject,
        price: tutor.price,
        date,
        time,
      },
    });
  };

  if (!tutor) {
    return <p className="text-center text-red-500">Tutor not found.</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-violet-700 text-center mb-4 font-righteous">
        Book a Lesson with {tutor.name}
      </h2>
      <form onSubmit={handleProceedToPayment} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Subject</label>
          <input
            type="text"
            value={tutor.subject}
            disabled
            className="w-full border rounded px-3 py-2 mt-1 bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Rate</label>
          <input
            type="text"
            value={tutor.price}
            disabled
            className="w-full border rounded px-3 py-2 mt-1 bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Choose Date</label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Choose Time</label>
          <input
            type="time"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-400 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Proceed to Payment
        </button>
      </form>
      <div className="flex justify-center pb-6">
          <button
            onClick={() => navigate(-1)}
            className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded transition"
          >
            ⬅ Back
          </button>
        </div>
    </div>
  );
}
