import React from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white px-4">
      <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-6 rounded-xl shadow-md text-center max-w-md w-full space-y-4">
        <h2 className="text-2xl font-bold font-righteous">✅ Payment Successful</h2>
        <p>Your payment was processed successfully!</p>
        <p className="text-sm text-gray-700">
          Our tutor will contact you shortly, and you'll receive a confirmation email soon. 📧
        </p>

        <div className="flex justify-center space-x-4 pt-2">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded transition"
          >
            ⬅ Back
          </button>
          <button
            onClick={() => navigate("/payment")}
            className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-4 py-2 rounded transition"
          >
            🎓 Book Another Lesson
          </button>
        </div>
      </div>
    </div>
  );
}
