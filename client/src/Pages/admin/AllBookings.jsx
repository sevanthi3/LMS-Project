import React, { useEffect, useState } from "react";

export default function AllBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("bookings");
    if (stored) setBookings(JSON.parse(stored));
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      <h2 className="text-2xl font-bold text-violet-700 mb-4">All Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-violet-100">
            <tr>
              <th className="p-2 border">Tutor</th>
              <th className="p-2 border">Subject</th>
              <th className="p-2 border">Rate</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Time</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, i) => (
              <tr key={i} className="text-center border-t">
                <td className="p-2 border">{b.tutorName}</td>
                <td className="p-2 border">{b.subject}</td>
                <td className="p-2 border">{b.rate}</td>
                <td className="p-2 border">{b.date}</td>
                <td className="p-2 border">{b.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
