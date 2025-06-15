// controllers/contact.controller.js

export const sendMail = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Check for empty fields
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Optional: Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Log the incoming data (for testing)
    console.log("📨 Contact form received:", { name, email, message });

    // === 👉 Send mail logic goes here (e.g., using Nodemailer) ===
    // Example placeholder:
    /*
    const transporter = nodemailer.createTransport({...});
    await transporter.sendMail({
      from: email,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Message from ${name}`,
      text: message
    });
    */

    // Respond to client
    res.status(200).json({ message: "Message received successfully!" });
  } catch (error) {
    console.error("❌ Error handling contact form:", error.message);
    res.status(500).json({
      message: "Server error, please try again later",
      error: error.message,
    });
  }
};
