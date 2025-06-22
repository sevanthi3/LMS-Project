import React from "react";
import { useParams, useNavigate } from "react-router-dom";

// Dummy tutor data
const dummyTutors = [
  {
    id: 1,
    name: "Dr. Arjun Kumar",
    subject: "Full Stack Development (MERN)",
    experience: "7 years",
    price: "₹700/hr",
    rating: 4.9,
    image: "https://i.pravatar.cc/150?img=1",
    bio: "Arjun is a highly experienced MERN Stack developer who has mentored over 200 students.",
  },
  {
    id: 2,
    name: "Ms. Divya Ramesh",
    subject: "Frontend (HTML, CSS, React)",
    experience: "5 years",
    price: "₹600/hr",
    rating: 4.8,
    image: "https://i.pravatar.cc/150?img=32",
    bio: "Divya specializes in modern frontend technologies and UI/UX best practices.",
  },
  {
    id: 3,
    name: "Mr. Rakesh Menon",
    subject: "Backend (Node.js, MongoDB)",
    experience: "6 years",
    price: "₹650/hr",
    rating: 4.7,
    image: "https://i.pravatar.cc/150?img=52",
    bio: "Rakesh is a backend expert with strong skills in scalable API development.",
  },
  {
    id: 4,
    name: "Ms. Anjali Sinha",
    subject: "UI/UX & Tailwind CSS",
    experience: "4 years",
    price: "₹550/hr",
    rating: 4.6,
    image: "https://i.pravatar.cc/150?img=47",
    bio: "Anjali brings design thinking and responsive web UI expertise to her students.",
  },
  {
    id: 5,
    name: "Mr. Rahul Verma",
    subject: "DSA + System Design",
    experience: "5 years",
    price: "₹500/hr",
    rating: 4.8,
    image: "https://i.pravatar.cc/150?img=68",
    bio: "Rahul is a DSA enthusiast and GFG contributor with system design experience.",
  },
  {
    id: 6,
    name: "Ms. Priya Mohan",
    subject: "DevOps + Cloud (AWS)",
    experience: "8 years",
    price: "₹700/hr",
    rating: 4.9,
    image: "https://i.pravatar.cc/150?img=12",
    bio: "Priya is an AWS certified professional with real-world cloud deployment expertise.",
  },
];

export default function TutorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tutor = dummyTutors.find((t) => t.id === parseInt(id));

  if (!tutor) {
    return (
      <div className="text-center py-10 text-red-500 text-lg">
        Tutor not found.{" "}
        <button
          className="underline text-violet-600"
          onClick={() => navigate("/search")}
        >
          Go back to Search
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-lg">
      <div className="text-center">
        <img
          src={tutor.image}
          alt={tutor.name}
          className="w-32 h-32 mx-auto rounded-full border-4 border-violet-600"
        />
        <h1 className="mt-4 text-3xl font-bold font-righteous text-violet-700">
          {tutor.name}
        </h1>
        <p className="text-gray-600 text-sm mt-1">{tutor.subject}</p>
        <p className="text-gray-500">⭐ {tutor.rating} | {tutor.experience}</p>
        <p className="mt-1 text-violet-600 font-medium">Rate: {tutor.price}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-violet-700 mb-2">
          About the Tutor
        </h2>
        <p className="text-gray-700">{tutor.bio}</p>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => navigate(`/book/tutor/${tutor.id}`)}
          className="px-6 py-2 bg-green-400 text-white rounded-lg hover:bg-green-700 transition font-medium"
        >
          Book a Lesson
        </button>
      </div>
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
