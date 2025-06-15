import express from "express";
import {
  register,
  login,
  logout,
  getProfile,
  forgotPassword,
  resetPassword,
  changePassword,
  updateUser
} from "../controllers/user.controller.js";

import { isLoggedIn } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";

const router = express.Router();

// Auth
router.post("/register", upload.single("avatar"), register);
router.post("/login", login);
router.get("/logout", isLoggedIn, logout); // ✅ logout added

// Profile
router.get("/me", isLoggedIn, getProfile); // ✅ using getProfile
router.put("/update", isLoggedIn, upload.single("avatar"), updateUser);

// Password
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:resetToken", resetPassword);
router.post("/change-password", isLoggedIn, changePassword);

export default router;
