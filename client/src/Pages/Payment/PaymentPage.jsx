import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const tutors = [
  { id: 1, name: "Dr. Arjun Kumar", subject: "Full Stack (MERN)", price: 700 },
  { id: 2, name: "Ms. Divya Ramesh", subject: "Frontend (React)", price: 600 },
  { id: 3, name: "Mr. Rakesh Menon", subject: "Backend (Node.js)", price: 650 },
  { id: 4, name: "Ms. Anjali Sinha", subject: "UI/UX + Tailwind CSS", price: 550 },
  { id: 5, name: "Mr. Rahul Verma", subject: "DSA + System Design", price: 500 },
  { id: 6, name: "Ms. Priya Mohan", subject: "DevOps + Cloud", price: 700 },
];

export default function PaymentPage() {
  const navigate = useNavigate();
  const [selectedTutorId, setSelectedTutorId] = useState("");
  const [upiId, setUpiId] = useState("");
  const [formError, setFormError] = useState("");

  const selectedTutor = tutors.find((t) => t.id === parseInt(selectedTutorId));

  const handlePayment = (e) => {
    e.preventDefault();

    if (!selectedTutorId || !upiId) {
      setFormError("❌ Please fill out all fields to proceed.");
      return;
    }

    setFormError("");
    navigate("/payment/success");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="bg-white p-0 rounded-xl shadow-lg max-w-md w-full border border-gray-200">
        {/* Header */}
        <div className="bg-violet-800 text-white text-center py-4 rounded-t-xl">
          <h2 className="text-2xl font-semibold font-righteous">Make a Payment</h2>
        </div>

        <form onSubmit={handlePayment} className="space-y-5 p-8">
          {formError && (
            <p className="text-red-600 font-medium text-center">{formError}</p>
          )}

          {/* Select Tutor */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Select Tutor</label>
            <select
              value={selectedTutorId}
              onChange={(e) => setSelectedTutorId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">-- Choose Tutor --</option>
              {tutors.map((tutor) => (
                <option key={tutor.id} value={tutor.id}>
                  {tutor.name} - {tutor.subject}
                </option>
              ))}
            </select>
          </div>

          {/* Tutor Amount */}
          {selectedTutor && (
            <div>
              <label className="block text-gray-700 font-medium mb-1">Amount</label>
              <input
                type="text"
                value={`₹${selectedTutor.price}`}
                disabled
                className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
              />
            </div>
          )}

          {/* UPI Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">UPI ID / Card No</label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="e.g. john_doe@upi or 1234 5678 9012 3456"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Pay Now */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            💳 Pay Now
          </button>
        </form>

        {/* Back Button */}
        <div className="flex justify-center pb-6">
          <button
            onClick={() => navigate(-1)}
            className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded transition"
          >
            ⬅ Back
          </button>
        </div>
      </div>
    </div>
  );
}
