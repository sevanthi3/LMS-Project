// server/app.js
import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import contactRouter from "./routes/contact.routes.js";
import courseRouter from "./routes/course.routes.js";

const app = express();

// CORS setup
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/user", userRouter);
app.use("/api", contactRouter);
app.use("/api/v1/courses", courseRouter);

app.get("/", (req, res) => {
  res.send("LMS Backend API is running 🚀");
});

export default app;
