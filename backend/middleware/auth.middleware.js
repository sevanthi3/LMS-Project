import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// ✅ Middleware 1: Authentication
export const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "User not logged in" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

// ✅ Middleware 2: Role-based access
export const authorisedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied for role: ${req.user.role}`,
      });
    }
    next();
  };
};

// ✅ Middleware 3: Subscription check
export const authorizeSubscriber = (req, res, next) => {
  if (req.user?.subscription?.status === "active") {
    return next();
  }

  res.status(403).json({
    success: false,
    message: "Only active subscribers can access this resource.",
  });
};
