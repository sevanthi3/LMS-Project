import mongoose from "mongoose";
import dotenv from "dotenv";
import courseModel from "./models/course.model.js";

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/lms", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB connected ✅");
})
.catch((err) => {
  console.error("MongoDB connection error ❌", err);
});

// Dummy data
const dummyCourses = [
  {
    title: "Full Stack Development",
    description: "Learn HTML, CSS, JavaScript, React, Node.js and MongoDB.",
    category: "Development",
    createdBy: "Sevanthi",
    thumbnail: {
      public_id: "dummy1",
      secure_url: "https://dummyimage.com/300x200/000/fff&text=Full+Stack",
    },
    lectures: [],
  },
  {
    title: "Java Programming",
    description: "Master Java with hands-on projects and practical examples.",
    category: "Programming",
    createdBy: "Sevanthi",
    thumbnail: {
      public_id: "dummy2",
      secure_url: "https://dummyimage.com/300x200/111/eee&text=Java",
    },
    lectures: [],
  },
  {
    title: "Python for Data Science",
    description: "Analyze data and build models using Python and libraries like pandas and scikit-learn.",
    category: "Data Science",
    createdBy: "Sevanthi",
    thumbnail: {
      public_id: "dummy3",
      secure_url: "https://dummyimage.com/300x200/222/ddd&text=Python+DS",
    },
    lectures: [],
  },
];

// Insert dummy courses
const insertCourses = async () => {
  try {
    await courseModel.deleteMany(); // Clears old courses
    await courseModel.insertMany(dummyCourses);
    console.log("✅ Dummy courses inserted successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Error inserting dummy courses", err);
    process.exit(1);
  }
};

insertCourses();
