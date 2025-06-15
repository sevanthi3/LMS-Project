import { Router } from "express";
const router = Router();

import {
  getAllCourses,
  getLecturesByCourseId,
  createCourse,
  updateCourse,
  removeCourse,
  addLectureToCourseById,
  deleteCourseLecture,
  updateCourseLecture,
  downloadLecture
} from "../controllers/course.controller.js";

import {
  isLoggedIn,
  authorisedRoles,
  authorizeSubscriber
} from "../middleware/auth.middleware.js";

import upload from "../middleware/multer.middleware.js";

// Public route → anyone can see courses
router.route("/")
  .get(getAllCourses)
  .post(isLoggedIn, authorisedRoles("ADMIN"), upload.single("thumbnail"), createCourse);

// Route with course id
router.route("/:id")
  .get(isLoggedIn, authorizeSubscriber, getLecturesByCourseId)
  .put(isLoggedIn, authorisedRoles("ADMIN"), upload.single("thumbnail"), updateCourse)
  .delete(isLoggedIn, authorisedRoles("ADMIN"), removeCourse)
  .post(isLoggedIn, authorisedRoles("ADMIN"), upload.single("lecture"), addLectureToCourseById);

// Download lecture route
router.get("/lecture/download/:courseId/:lectureId", isLoggedIn, authorizeSubscriber, downloadLecture);

export default router;

