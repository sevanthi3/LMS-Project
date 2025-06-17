import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../Redux/Slices/courseSlice";
import CourseCard from "../../Components/CourseCard";

export default function CourseList() {
  const dispatch = useDispatch();
  const { coursesData, loading } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Available Courses</h1>

      {loading ? (
        <p className="text-center text-lg">Loading courses...</p>
      ) : coursesData?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coursesData.map((course) => (
            <CourseCard key={course._id} data={course} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No courses found.</p>
      )}
    </section>
  );
}
