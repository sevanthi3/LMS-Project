import express from 'express';
const router = express.Router();

// Route: POST /api/contactsendMail
router.post('/contactsendMail', (req, res) => {
  console.log('📩 Contact Form Data:', req.body);

  // In production, send email using nodemailer here
  res.json({ message: 'Contact form received successfully!' });
});

export default router;
