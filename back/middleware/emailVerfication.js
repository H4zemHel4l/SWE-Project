import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "teambooktopia@gmail.com",
    pass: "Booktopia123",
  },
});

const sendVerificationEmail = (userEmail, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  const verificationLink = `http://localhost5000/verify?token=${token}`;

  const mailOptions = {
    from: "teambooktopia@gmail.com",
    to: userEmail,
    subject: "Verify Your Email",
    html: `<p>Click the following link to verify your email:</p><p><a href="${verificationLink}">${verificationLink}</a></p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending verification email:", error);
    } else {
      console.log("Verification email sent:", info.response);
    }
  });
};

export default sendVerificationEmail;
