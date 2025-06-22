import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/courses/${id}`, {
        withCredentials: true,
      })
      .then((res) => setCourse(res.data.course))
      .catch((err) => console.error(err));
  }, [id]);

  if (!course) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 bg-white dark:bg-gray-900 rounded-md shadow">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Course Image */}
        <img
          src={course.image || "https://via.placeholder.com/300"}
          alt={course.title}
          className="w-full md:w-1/2 rounded-lg shadow"
        />

        {/* Course Info */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-indigo-700 dark:text-white mb-2">
            {course.title}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {course.description}
          </p>

          <div className="text-gray-600 dark:text-gray-300 mb-6 space-y-2">
            <p>
              <strong>Trainer:</strong> {course.trainer || "N/A"}
            </p>
            <p>
              <strong>Fees:</strong> ₹{course.fees || "0"}
            </p>
            <p>
              <strong>Duration:</strong> {course.duration || "N/A"}
            </p>
          </div>

          <button
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-300"
            onClick={() => alert("Enrolled successfully!")}
          >
            Enroll Now
          </button>
        </div>
      </div>

      {/* Lecture Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4 dark:text-white">Lectures</h3>
        {course.lectures && course.lectures.length > 0 ? (
          <ul className="space-y-4">
            {course.lectures.map((lecture) => (
              <li
                key={lecture._id}
                className="border p-4 rounded shadow-sm bg-gray-50 dark:bg-gray-800"
              >
                <p className="font-medium text-lg dark:text-white">
                  {lecture.title}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  {lecture.description}
                </p>
                <a
                  href={lecture.lecture.secure_url}
                  download
                  className="text-green-600 hover:underline"
                >
                  📥 Download Lecture Video
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No lectures available.</p>
        )}
      </div>
    </div>
  );
}
