import AppError from "../utils/error.utils.js";

const getAllCourses = async (req, res, next) => {
  try {
    const dummyCourses = [
      {
        _id: "1",
        name: "Dr. Arjun Kumar",
        subject: "Full Stack Development (MERN)",
        price: "₹700/hr",
      },
      {
        _id: "2",
        name: "Ms. Divya Ramesh",
        subject: "Frontend (HTML, CSS, React)",
        price: "₹600/hr",
      },
      {
        _id: "3",
        name: "Mr. Rakesh Menon",
        subject: "Backend (Node.js, MongoDB)",
        price: "₹650/hr",
      },
      {
        _id: "4",
        name: "Ms. Anjali Sinha",
        subject: "UI/UX & Tailwind CSS",
        price: "₹550/hr",
      },
      {
        _id: "5",
        name: "Mr. Rahul Verma",
        subject: "DSA + System Design",
        price: "₹500/hr",
      },
      {
        _id: "6",
        name: "Ms. Priya Mohan",
        subject: "DevOps + Cloud (AWS)",
        price: "₹700/hr",
      },
    ];

    return res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      courses: dummyCourses,
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

const getLecturesByCourseId = async (req, res, next) => {
  try {
    const { id } = req.params;
    return res.status(200).json({
      success: true,
      message: `Dummy: Fetched lectures for course ${id}`,
      lectures: [],
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

// ✅ Create Course
const createCourse = async (req, res, next) => {
  try {
    return res.status(201).json({
      success: true,
      message: "Dummy: Course created successfully",
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

// ✅ Update Course
const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    return res.status(200).json({
      success: true,
      message: `Dummy: Course ${id} updated successfully`,
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

// ✅ Remove Course
const removeCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    return res.status(200).json({
      success: true,
      message: `Dummy: Course ${id} removed successfully`,
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

// ✅ Add Lecture to Course
const addLectureToCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    return res.status(201).json({
      success: true,
      message: `Dummy: Lecture added to course ${id}`,
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

// ✅ Delete Lecture
const deleteCourseLecture = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Dummy: Lecture deleted successfully",
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

// ✅ Update Lecture
const updateCourseLecture = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Dummy: Lecture updated successfully",
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

// ✅ Download Lecture
const downloadLecture = async (req, res, next) => {
  try {
    const { courseId, lectureId } = req.params;
    return res.status(200).json({
      success: true,
      message: `Dummy: Download link for lecture ${lectureId} of course ${courseId}`,
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};


// Then export everything including this
export {
  getAllCourses,
  getLecturesByCourseId,
  createCourse,
  updateCourse,
  removeCourse,
  addLectureToCourseById, // Now it's valid
  deleteCourseLecture,
  updateCourseLecture,
  downloadLecture,
};
