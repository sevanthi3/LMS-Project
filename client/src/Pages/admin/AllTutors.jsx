import React from "react";

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

export default function AllTutors() {
  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <h2 className="text-2xl font-bold text-violet-700 mb-4">All Tutors</h2>
      <ul className="space-y-4">
        {dummyTutors.map((tutor) => (
          <li
            key={tutor.id}
            className="bg-white p-4 rounded-lg shadow border border-gray-100"
          >
            <h3 className="text-lg font-semibold">{tutor.name}</h3>
            <p>{tutor.subject}</p>
            <p className="text-sm text-gray-600">{tutor.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
