import nodemailer from 'nodemailer';

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587, // Change to 587 for TLS
      secure: false, // Set to false for TLS
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER, // Use MAIL_USER as sender
      to: email,
      subject: subject,
      text: text,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email send error:", error);
    throw new Error("Email could not be sent");
  }
};

export default sendEmail; 