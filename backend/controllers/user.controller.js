import { User } from "../models/user.model.js";

const register = async (req, res) => {
  try {
    console.log("📥 Incoming registration data:", req.body);

    const { fullName, email, password } = req.body;
    const role = req.body.role || "student"; // Optional fallback

    if (!fullName || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const user = await User.create({ fullName, email, password, role });
    const token = user.generateToken(); // ✅ No more error

    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "Lax",
      })
      .json({ success: true, message: "User registered", user });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// 🔓 Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

    const token = user.generateToken();

    res.status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ success: true, message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const logout = (req, res) => {
  res.clearCookie("token").status(200).json({
    success: true,
    message: "Logout successful",
  });
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Unable to fetch profile" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const resetToken = user.generateToken(); // placeholder logic
    res.status(200).json({ success: true, message: "Reset token generated", resetToken });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error generating reset token" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;

    const user = await User.findOne(); // placeholder logic
    if (!user) return res.status(400).json({ success: false, message: "Invalid token" });

    user.password = newPassword;
    await user.save();

    res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Unable to reset password" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select("+password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) return res.status(401).json({ success: false, message: "Incorrect old password" });

    user.password = newPassword;
    await user.save();

    res.status(200).json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Unable to change password" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { fullName } = req.body;
    const avatar = req.file?.path;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (fullName) user.fullName = fullName;
    if (avatar) user.avatar = avatar;

    await user.save();

    res.status(200).json({ success: true, message: "Profile updated", user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update user" });
  }
};

const fetchAllStudentUsers = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).select("-password");
    res.status(200).json({ success: true, students });
  } catch (error) {
    console.error("Fetch students error:", error);
    res.status(500).json({ success: false, message: "Unable to fetch students" });
  }
};

export {
  register,
  login,
  logout,
  getProfile,
  forgotPassword,
  resetPassword,
  changePassword,
  updateUser,
  fetchAllStudentUsers,
};
