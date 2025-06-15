import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaBook, FaUser, FaRupeeSign, FaClock } from "react-icons/fa";

export default function CourseCard({ data }) {
  const navigate = useNavigate();

  return (
    <div 
      className="md:w-[22rem] w-[95%] md:h-auto shadow-custom dark:shadow-lg rounded-lg cursor-pointer group overflow-hidden bg-white dark:bg-zinc-700 transition-transform transform hover:scale-[1.01]"
      onClick={() => navigate("/courses/description/", { state: { ...data } })}
    >
      {/* Thumbnail placeholder with gradient */}
      <div className="relative overflow-hidden h-48 w-full bg-gradient-to-br from-purple-500 via-pink-400 to-yellow-400 dark:from-zinc-600 dark:via-zinc-700 dark:to-zinc-800 flex items-center justify-center rounded-tl-lg rounded-tr-lg">
        <FaPlay className="text-white text-4xl opacity-70" />
      </div>

      <div className="p-4 md:space-y-2 space-y-3 text-gray-800 dark:text-white">
        <h2 className="text-2xl font-semibold line-clamp-2">{data?.title}</h2>
        <p className="line-clamp-2 font-nunito-sans text-base font-[500]">{data?.description}</p>

        <div className="flex items-center space-x-2">
          <FaBook className="text-yellow-500 dark:text-yellow-400" />
          <p className="text-base font-semibold">Category: {data?.category}</p>
        </div>

        <div className="flex items-center space-x-2">
          <FaBook className="text-yellow-500 dark:text-yellow-400" />
          <p className="text-base font-semibold">Total lectures: {data?.numberoflectures || 0}</p>
        </div>

        <div className="flex items-center space-x-2">
          <FaUser className="text-yellow-500 dark:text-yellow-400" />
          <p className="text-base font-semibold">Instructor: {data?.trainer || data?.createdBy}</p>
        </div>

        <div className="flex items-center space-x-2">
          <FaClock className="text-yellow-500 dark:text-yellow-400" />
          <p className="text-base font-semibold">Duration: {data?.trainingHours}</p>
        </div>

        <div className="flex items-center space-x-2">
          <FaRupeeSign className="text-yellow-500 dark:text-yellow-400" />
          <p className="text-base font-semibold">Fees: ₹{data?.fees}</p>
        </div>
      </div>
    </div>
  );
}
