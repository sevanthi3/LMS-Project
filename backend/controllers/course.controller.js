import AppError from "../utils/error.utils.js";

const getAllCourses = async (req, res, next) => {
  try {
    const dummyCourses = [
      {
        _id: "1",
        title: "Full Stack Development (MERN)",
        description: "Learn full stack MERN development from scratch.",
        category: "Full Stack",
        numberOfLectures: 12,
        trainer: "Dr. Arjun Kumar",
        trainingHours: "40 hrs",
        fees: 700,
      },
      {
        _id: "2",
        title: "Frontend (HTML, CSS, React)",
        description: "Master frontend development with hands-on projects.",
        category: "Frontend",
        numberOfLectures: 10,
        trainer: "Ms. Divya Ramesh",
        trainingHours: "30 hrs",
        fees: 600,
      },
      {
        _id: "3",
        title: "Backend (Node.js, MongoDB)",
        description: "Deep dive into backend APIs with Node.js and MongoDB.",
        category: "Backend",
        numberOfLectures: 14,
        trainer: "Mr. Rakesh Menon",
        trainingHours: "35 hrs",
        fees: 650,
      },
      {
        _id: "4",
        title: "UI/UX & Tailwind CSS",
        description: "Design stunning UIs with Tailwind and UX best practices.",
        category: "UI/UX",
        numberOfLectures: 8,
        trainer: "Ms. Anjali Sinha",
        trainingHours: "25 hrs",
        fees: 550,
      },
      {
        _id: "5",
        title: "DSA + System Design",
        description: "Crack tech interviews with DSA and system design.",
        category: "DSA",
        numberOfLectures: 16,
        trainer: "Mr. Rahul Verma",
        trainingHours: "45 hrs",
        fees: 500,
      },
      {
        _id: "6",
        title: "DevOps + Cloud (AWS)",
        description: "Build scalable cloud pipelines using AWS and DevOps tools.",
        category: "Cloud",
        numberOfLectures: 20,
        trainer: "Ms. Priya Mohan",
        trainingHours: "50 hrs",
        fees: 700,
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

export {
  getAllCourses,
  getLecturesByCourseId,
  createCourse,
  updateCourse,
  removeCourse,
  addLectureToCourseById,
  deleteCourseLecture,
  updateCourseLecture,
  downloadLecture,
};
