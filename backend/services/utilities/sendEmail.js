import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,      // your gmail address
    pass: process.env.EMAIL_PASS,      // your gmail app password
  },
});

export const sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    from: `"My App" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};
