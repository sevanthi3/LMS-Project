import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const dummyTutors = [
  {
    id: 1,
    name: "Dr. Arjun Kumar",
    subject: "Full Stack Development",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Ms. Divya Ramesh",
    subject: "Frontend Developer",
    image: "https://i.pravatar.cc/150?img=32",
  },
];

export default function ScheduleLesson() {
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [message, setMessage] = useState("");

  const timeSlots = [
    "10:00 AM", "11:00 AM", "12:00 PM",
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
  ];

  const handleSchedule = () => {
    if (!selectedTutor || !selectedDate || !selectedTime) {
      alert("Please fill all fields to schedule a lesson.");
      return;
    }
    alert(`🎉 Lesson booked with ${selectedTutor.name} on ${selectedDate.toDateString()} at ${selectedTime}`);
    // Optional: You can send this to backend here
    setSelectedTutor(null);
    setSelectedDate(null);
    setSelectedTime("");
    setMessage("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-violet-700 mb-8">Schedule a Lesson</h1>

      {/* Tutor List */}
      {!selectedTutor && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dummyTutors.map((tutor) => (
            <div key={tutor.id} className="border p-4 rounded-xl text-center shadow">
              <img
                src={tutor.image}
                alt={tutor.name}
                className="w-20 h-20 rounded-full mx-auto border mb-2"
              />
              <h2 className="text-lg font-semibold">{tutor.name}</h2>
              <p className="text-sm text-gray-600">{tutor.subject}</p>
              <button
                className="mt-3 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
                onClick={() => setSelectedTutor(tutor)}
              >
                Select Tutor
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Booking Form */}
      {selectedTutor && (
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-violet-700 mb-4">
            Booking for: {selectedTutor.name}
          </h2>

          <label className="block mb-2 font-medium">Choose a Date:</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="border px-3 py-2 rounded-lg w-full mb-4"
            minDate={new Date()}
            placeholderText="Select date"
          />

          <label className="block mb-2 font-medium">Choose a Time:</label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="border px-3 py-2 rounded-lg w-full mb-4"
          >
            <option value="">Select time slot</option>
            {timeSlots.map((slot, i) => (
              <option key={i} value={slot}>
                {slot}
              </option>
            ))}
          </select>

          <label className="block mb-2 font-medium">Message (optional):</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            className="border px-3 py-2 rounded-lg w-full mb-4"
            placeholder="Add a note for the tutor..."
          />

          <div className="flex gap-4">
            <button
              onClick={handleSchedule}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Confirm Booking
            </button>
            <button
              onClick={() => setSelectedTutor(null)}
              className="bg-gray-300 text-black px-6 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
