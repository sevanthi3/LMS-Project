import React, { useEffect, useState } from "react";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedBookings = localStorage.getItem("bookings");
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <h2 className="text-3xl font-bold text-violet-700 mb-6 font-righteous text-center">
        My Bookings
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings yet.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-violet-700">{booking.tutorName}</h3>
              <p className="text-gray-600">{booking.subject}</p>
              <p className="text-sm text-gray-500">Rate: {booking.rate}</p>
              <p className="text-sm text-gray-500">
                Date: <span className="font-medium">{booking.date}</span> | Time:{" "}
                <span className="font-medium">{booking.time}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
