import express from "express";
import * as userController from "../controllers/user.controller.js";
import { isLoggedIn, authorisedRoles } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";

console.log("🛠 isLoggedIn:", typeof isLoggedIn);
console.log("🛠 authorisedRoles:", typeof authorisedRoles);
console.log("🛠 fetchAllStudentUsers:", typeof userController.fetchAllStudentUsers);

const router = express.Router();

// ✅ Auth Routes
router.post("/register", upload.single("avatar"), userController.register);
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

// ✅ Export the router
export default router;
