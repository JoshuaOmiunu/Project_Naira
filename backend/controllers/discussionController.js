const nodemailer = require("nodemailer");
const Discussion = require("../models/Email");

exports.createMessage = async (req, res) => {
  console.log("Request Body:", req.body);
  const { name, email, text } = req.body; // Capture name, email, and text from request
  const adminEmail = "kevinomismith@gmail.com"; // Admin email

  // Check for required fields
  if (!name || !email || !text) {
    return res
      .status(400)
      .json({ message: "Name, email, and text are required." });
  }

  try {
    // Save the message to the database
    const newMessage = new Discussion({ name, email, text }); // Create new message with name, email, and text
    await newMessage.save();

    // Configure nodemailer directly using the credentials
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "fdf8b6b4d49381",
        pass: "72ff2d75da499a",
      },
      secure: false, // Use true for 465, false for other ports
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Define email options for the admin
    const adminMailOptions = {
      from: "9eed1436bc71bc@sandbox.smtp.mailtrap.io", // Sender email
      to: adminEmail,
      subject: `New message from ${name}`,
      text: `You have a new message from ${name} (${email}):\n\n${text}`,
    };

    // Define email options for the user
    const userMailOptions = {
      from: "9eed1436bc71bc@sandbox.smtp.mailtrap.io",
      to: email, // Send to the user's provided email
      subject: "Thank you for your message!",
      text: `Hello ${name},\n\nThank you for reaching out. We have received your message and will respond shortly.\n\nYour message:\n\n${text}`,
    };

    // Send emails to both admin and user
    await transporter.sendMail(adminMailOptions);
    console.log("Email sent to admin successfully!");

    await transporter.sendMail(userMailOptions);
    console.log("Acknowledgment email sent to user successfully!");

    res.status(201).json({
      message: "Message created, emails sent to admin and user!",
      newMessage,
    });
  } catch (error) {
    console.error("Error sending email:", error.message);
    res
      .status(500)
      .json({ message: "Failed to create message or send emails" });
  }
};
