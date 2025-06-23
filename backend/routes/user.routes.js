import express from "express";
import * as userController from "../controllers/user.controller.js";
import { isLoggedIn, authorisedRoles } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";

const router = express.Router();

// ✅ Auth Routes
router.post("/register", userController.register); // 🔧 avatar middleware removed
router.post("/login", userController.login);
router.get("/logout", isLoggedIn, userController.logout);

// ✅ Profile Routes
router.get("/me", isLoggedIn, userController.getProfile);
router.put("/update", isLoggedIn, upload.single("avatar"), userController.updateUser);

// ✅ Password Routes
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password/:resetToken", userController.resetPassword);
router.post("/change-password", isLoggedIn, userController.changePassword);

// ✅ Admin Route - List Student Users
router.get(
  "/get-student-users",
  isLoggedIn,
  authorisedRoles("ADMIN"),
  userController.fetchAllStudentUsers
);

export default router;
