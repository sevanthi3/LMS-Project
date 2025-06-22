import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const dummyStudents = [
    {
      _id: "1",
      fullName: "John Doe",
      email: "john@student.com",
      createdAt: "2025-01-10T10:00:00Z",
      isActive: true,
      course: "MERN Stack",
      trainer: "Mr. Arjun",
    },
    {
      _id: "2",
      fullName: "Jane Smith",
      email: "jane@student.com",
      createdAt: "2025-02-05T14:20:00Z",
      isActive: false,
      course: "Python & Django",
      trainer: "Ms. Priya",
    },
    {
      _id: "3",
      fullName: "Alex Johnson",
      email: "alex@student.com",
      createdAt: "2025-03-15T08:30:00Z",
      isActive: true,
      course: "Java Full Stack",
      trainer: "Mr. Raj",
    },
    {
      _id: "4",
      fullName: "Mira Patel",
      email: "mira@student.com",
      createdAt: "2025-04-01T09:00:00Z",
      isActive: false,
      course: "React.js",
      trainer: "Ms. Sneha",
    },
    {
      _id: "5",
      fullName: "Liam Wong",
      email: "liam@student.com",
      createdAt: "2025-04-22T17:45:00Z",
      isActive: true,
      course: "Node.js",
      trainer: "Mr. Karthik",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setStudents(dummyStudents);
      setLoading(false);
    }, 1000);
  }, []);

  const toggleActivation = (id) => {
    setStudents((prev) =>
      prev.map((student) =>
        student._id === id
          ? { ...student, isActive: !student.isActive }
          : student
      )
    );
    toast.success("Student status updated");
  };

  return (
    <div className="max-w-7xl mx-auto p-6 mt-10 bg-white shadow-md rounded-xl">
      <h2 className="text-3xl font-bold text-center mb-6 text-violet-700 font-righteous">
        Manage Students
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading students...</p>
      ) : students.length === 0 ? (
        <p className="text-center text-gray-500">No students found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded">
            <thead>
              <tr className="bg-violet-600 text-white">
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Joined</th>
                <th className="py-2 px-4 text-left">Course</th>
                <th className="py-2 px-4 text-left">Trainer</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} className="border-t">
                  <td className="py-2 px-4">{student.fullName}</td>
                  <td className="py-2 px-4">{student.email}</td>
                  <td className="py-2 px-4">
                    {new Date(student.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">{student.course}</td>
                  <td className="py-2 px-4">{student.trainer}</td>
                  <td className="py-2 px-4">
                    {student.isActive ? (
                      <span className="text-green-600 font-semibold">Active</span>
                    ) : (
                      <span className="text-red-600 font-semibold">Inactive</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => toggleActivation(student._id)}
                      className={`px-4 py-1 rounded-md text-white font-semibold ${
                        student.isActive
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {student.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
