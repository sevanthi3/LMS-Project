import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import courseRoutes from "./routes/course.routes.js"; // ✅ Add this!
import contactRoutes from "./routes/contact.routes.js"; // ✅ Add this!

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB error:", err.message));

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// ✅ Mount all routers
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/courses", courseRoutes); // ✅ This line is CRUCIAL!
app.use("/api/v1/contact", contactRoutes);

app.get("/", (req, res) => {
  res.send("LMS Backend is Running 🚀");
});

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "Test route works!" });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});

