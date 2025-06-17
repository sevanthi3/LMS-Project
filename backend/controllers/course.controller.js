import AppError from "../utils/error.utils.js";

// Get all courses (with dummy data)
const getAllCourses = async (req, res, next) => {
  try {
    const dummyCourses = [
      {
        _id: "1",
        title: "Full Stack Development",
        description: "Learn MERN stack from scratch with real-time projects.",
        category: "Web Development",
        createdBy: "John Doe",
        fees: "₹9999",
        trainingHours: "120 hours",
        trainer: "Rajesh Kumar",
        thumbnail: {
          secure_url: "https://via.placeholder.com/300x200?text=FSD"
        },
        lectures: [],
      },
      {
        _id: "2",
        title: "Data Science Mastery",
        description: "Data Analysis, Python, ML models, and deployment.",
        category: "Data Science",
        createdBy: "Jane Smith",
        fees: "₹11999",
        trainingHours: "100 hours",
        trainer: "Neha Gupta",
        thumbnail: {
          secure_url: "https://via.placeholder.com/300x200?text=DS"
        },
        lectures: [],
      },
      {
        _id: "3",
        title: "Python for Automation",
        description: "Automate boring tasks using Python scripts and libraries.",
        category: "Scripting",
        createdBy: "David Tech",
        fees: "₹4999",
        trainingHours: "60 hours",
        trainer: "Amit Verma",
        thumbnail: {
          secure_url: "https://via.placeholder.com/300x200?text=Python"
        },
        lectures: [],
      },
      {
        _id: "4",
        title: "AWS DevOps Bootcamp",
        description: "Master DevOps practices with AWS tools like EC2, S3, CodePipeline.",
        category: "Cloud & DevOps",
        createdBy: "Cloud Guru",
        fees: "₹10999",
        trainingHours: "90 hours",
        trainer: "Sanjay Mehta",
        thumbnail: {
          secure_url: "https://via.placeholder.com/300x200?text=AWS"
        },
        lectures: [],
      },
      {
        _id: "5",
        title: "UI/UX Design Basics",
        description: "Understand design principles, Figma, and user experience strategy.",
        category: "Design",
        createdBy: "Creative Lead",
        fees: "₹6999",
        trainingHours: "50 hours",
        trainer: "Priya Nair",
        thumbnail: {
          secure_url: "https://via.placeholder.com/300x200?text=UIUX"
        },
        lectures: [],
      },
      {
        _id: "6",
        title: "Cyber Security Essentials",
        description: "Intro to ethical hacking, network security, and tools.",
        category: "Security",
        createdBy: "Cyber Ninja",
        fees: "₹8999",
        trainingHours: "75 hours",
        trainer: "Rohit Sharma",
        thumbnail: {
          secure_url: "https://via.placeholder.com/300x200?text=Security"
        },
        lectures: [],
      }
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
