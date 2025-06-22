// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import courseRoutes from "./routes/course.routes.js";
import contactRoutes from "./routes/contact.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS Setup
const allowedOrigins = [
  "http://localhost:5173",
  "https://6858167a33cfb9e3e43342a5--lms-frontend-app.netlify.app/", // ✅ Use your deployed frontend here
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.options("*", cors()); // ✅ Handle preflight requests

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB error:", err.message));

// ✅ Razorpay Setup
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// ✅ Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/contact", contactRoutes);

// ✅ Default Routes
app.get("/", (req, res) => {
  res.send("LMS Backend is Running 🚀");
});

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "Test route works!" });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
