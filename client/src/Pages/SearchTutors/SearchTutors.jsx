import React, { useState } from "react";
import { Link } from "react-router-dom";

const dummyTutors = [
  {
    id: 1,
    name: "Dr. Arjun Kumar",
    subject: "Full Stack Development (MERN)",
    experience: "7 years",
    price: "₹700/hr",
    rating: 4.9,
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Ms. Divya Ramesh",
    subject: "Frontend (HTML, CSS, React)",
    experience: "5 years",
    price: "₹600/hr",
    rating: 4.8,
    image: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: 3,
    name: "Mr. Rakesh Menon",
    subject: "Backend (Node.js, MongoDB)",
    experience: "6 years",
    price: "₹650/hr",
    rating: 4.7,
    image: "https://i.pravatar.cc/150?img=52",
  },
  {
    id: 4,
    name: "Ms. Anjali Sinha",
    subject: "UI/UX & Tailwind CSS",
    experience: "4 years",
    price: "₹550/hr",
    rating: 4.6,
    image: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 5,
    name: "Mr. Rahul Verma",
    subject: "DSA + System Design",
    experience: "5 years",
    price: "₹500/hr",
    rating: 4.8,
    image: "https://i.pravatar.cc/150?img=68",
  },
  {
    id: 6,
    name: "Ms. Priya Mohan",
    subject: "DevOps + Cloud (AWS)",
    experience: "8 years",
    price: "₹700/hr",
    rating: 4.9,
    image: "https://i.pravatar.cc/150?img=12",
  },
];

export default function SearchTutors() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTutors = dummyTutors.filter(
    (tutor) =>
      tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutor.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-righteous text-center text-violet-700 mb-8">
        Find Your Ideal Tutor
      </h1>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="🔍 Search by name or subject..."
        className="w-full md:w-1/2 block mx-auto px-4 py-2 border border-violet-300 rounded-full focus:outline-none focus:ring-2 focus:ring-violet-500 mb-10"
      />

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {filteredTutors.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">No tutors found.</p>
        ) : (
          filteredTutors.map((tutor) => (
            <div
              key={tutor.id}
              className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition duration-300 text-center"
            >
              <img
                src={tutor.image}
                alt={tutor.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-violet-500"
              />
              <h2 className="text-xl font-semibold text-violet-800 font-righteous">
                {tutor.name}
              </h2>
              <p className="text-gray-600 text-sm mt-1">{tutor.subject}</p>
              <p className="text-gray-500 text-sm">Experience: {tutor.experience}</p>
              <p className="text-gray-500 text-sm">Rate: {tutor.price}</p>
              <p className="text-yellow-500 font-semibold">⭐ {tutor.rating}</p>

              <Link to={`/tutor/${tutor.id}`}>
                <button className="mt-4 w-full py-2 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 transition">
                  View Profile
                </button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
