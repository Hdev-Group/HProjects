import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { userName, userEmail, link } = req.body;

  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Define the email options
  const mailOptions = {
    from: `"HProjects" <${process.env.SMTP_USER}>`, // Sender address
    to: userEmail, // Receiver email
    subject: `Welcome, ${userName}!`, // Subject line
    text: `Hi ${userName},\n\nWelcome to our service! Please click the link below to get started:\n\n${link}\n\nBest regards,\nYour Company`, // Plain text body
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
}
