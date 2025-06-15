import courseModel from '../models/course.model.js';
import AppError from '../utils/error.utils.js';
import cloudinary from 'cloudinary';
import fs from 'fs';

// Get all courses
const getAllCourses = async (req, res, next) => {
  try {
    const courses = await courseModel.find({}).select('-lectures');
    res.status(200).json({
      success: true,
      message: 'All courses',
      courses,
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

// Get specific course with lectures
const getLecturesByCourseId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await courseModel.findById(id);
    if (!course) return next(new AppError('Course not found', 404));

    res.status(200).json({
      success: true,
      message: 'Course fetched successfully',
      course,
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

// Create course
const createCourse = async (req, res, next) => {
  try {
    const { title, description, category, createdBy } = req.body;

    if (!title || !description || !category || !createdBy) {
      return next(new AppError('All fields are required', 400));
    }

    const course = await courseModel.create({ title, description, category, createdBy });

    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'Learning-Management-System',
      });

      if (result) {
        course.thumbnail.public_id = result.public_id;
        course.thumbnail.secure_url = result.secure_url;
      }

      fs.rmSync(`uploads/${req.file.filename}`);
    }

    await course.save();

    res.status(200).json({
      success: true,
      message: 'Course successfully created',
      course,
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

// Update course
const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await courseModel.findById(id);
    if (!course) return next(new AppError('Course with given id does not exist', 404));

    const { title, description, category, createdBy } = req.body;
    if (title) course.title = title;
    if (description) course.description = description;
    if (category) course.category = category;
    if (createdBy) course.createdBy = createdBy;

    if (req.file) {
      if (course.thumbnail.public_id) {
        await cloudinary.v2.uploader.destroy(course.thumbnail.public_id);
      }

      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'Learning-Management-System',
      });

      if (result) {
        course.thumbnail.public_id = result.public_id;
        course.thumbnail.secure_url = result.secure_url;
      }

      fs.rmSync(`uploads/${req.file.filename}`);
    }

    await course.save();

    res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      course,
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

// Remove course
const removeCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await courseModel.findById(id);
    if (!course) return next(new AppError('Course with given id does not exist', 404));

    if (course.thumbnail.public_id) {
      await cloudinary.v2.uploader.destroy(course.thumbnail.public_id);
    }

    for (const lecture of course.lectures) {
      if (lecture.lecture.public_id) {
        await cloudinary.v2.uploader.destroy(lecture.lecture.public_id, {
          resource_type: 'video',
        });
      }
    }

    await courseModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Course deleted successfully',
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

// Add lecture
const addLectureToCourseById = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;
    if (!title || !description) return next(new AppError('All fields are required', 400));

    const course = await courseModel.findById(id);
    if (!course) return next(new AppError('Course with given id does not exist', 404));

    const lectureData = {
      title,
      description,
      lecture: {},
    };

    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'Learning-Management-System',
        resource_type: 'video',
      });

      if (result) {
        lectureData.lecture.public_id = result.public_id;
        lectureData.lecture.secure_url = result.secure_url;
      }

      fs.rmSync(`uploads/${req.file.filename}`);
    }

    course.lectures.push(lectureData);
    course.numberOfLectures = course.lectures.length;

    await course.save();

    res.status(200).json({
      success: true,
      message: 'Lecture added successfully',
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

// Delete lecture
const deleteCourseLecture = async (req, res, next) => {
  try {
    const { courseId, lectureId } = req.query;

    const course = await courseModel.findById(courseId);
    if (!course) return next(new AppError('Course not found', 404));

    const lectureIndex = course.lectures.findIndex(
      (lecture) => lecture._id.toString() === lectureId
    );

    if (lectureIndex === -1) return next(new AppError('Lecture not found in the course', 404));

    const lecture = course.lectures[lectureIndex];
    if (lecture.lecture.public_id) {
      await cloudinary.v2.uploader.destroy(lecture.lecture.public_id, {
        resource_type: 'video',
      });
    }

    course.lectures.splice(lectureIndex, 1);
    course.numberOfLectures = course.lectures.length;

    await course.save();

    res.status(200).json({
      success: true,
      message: 'Lecture deleted successfully',
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

// Update lecture
const updateCourseLecture = async (req, res, next) => {
  try {
    const { courseId, lectureId } = req.query;
    const { title, description } = req.body;

    if (!title || !description) return next(new AppError('All fields are required', 400));

    const course = await courseModel.findById(courseId);
    if (!course) return next(new AppError('Course not found', 404));

    const lectureIndex = course.lectures.findIndex(
      (lecture) => lecture._id.toString() === lectureId
    );

    if (lectureIndex === -1) return next(new AppError('Lecture not found in the course', 404));

    course.lectures[lectureIndex].title = title;
    course.lectures[lectureIndex].description = description;

    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'Learning-Management-System',
        resource_type: 'video',
      });

      if (result) {
        if (course.lectures[lectureIndex].lecture.public_id) {
          await cloudinary.v2.uploader.destroy(
            course.lectures[lectureIndex].lecture.public_id,
            { resource_type: 'video' }
          );
        }

        course.lectures[lectureIndex].lecture.public_id = result.public_id;
        course.lectures[lectureIndex].lecture.secure_url = result.secure_url;

        fs.rmSync(`uploads/${req.file.filename}`);
      }
    }

    await course.save();

    res.status(200).json({
      success: true,
      message: 'Lecture updated successfully',
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

// ✅ NEW — Download lecture video
const downloadLecture = async (req, res, next) => {
  try {
    const { courseId, lectureId } = req.params;

    const course = await courseModel.findById(courseId);
    if (!course) return next(new AppError("Course not found", 404));

    const lecture = course.lectures.find((lec) => lec._id.toString() === lectureId);
    if (!lecture) return next(new AppError("Lecture not found", 404));

    return res.status(200).json({
      success: true,
      message: "Lecture download URL fetched successfully",
      downloadUrl: lecture.lecture.secure_url,
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
  downloadLecture, // ✅ Export the new controller
};
