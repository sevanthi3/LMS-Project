import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Feedback() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || !review.trim()) {
      toast.error("Please give a rating and feedback!");
      return;
    }
    // Simulate feedback submission
    toast.success("Feedback submitted successfully!");
    setRating(0);
    setReview("");
    navigate("/my-courses"); // Or wherever you want to go
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-5 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
        Submit Feedback for Course ID: {id}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-medium">Rating:</label>
          <div className="flex space-x-2 mt-1">
            {[1, 2, 3, 4, 5].map((num) => (
              <span
                key={num}
                className={`cursor-pointer text-2xl ${
                  num <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => setRating(num)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="font-medium block mb-1">Feedback:</label>
          <textarea
            rows={5}
            className="w-full p-2 border border-gray-300 rounded"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your thoughts about the course..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}
