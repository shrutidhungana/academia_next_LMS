import nodemailer from "nodemailer";

export const sendEmailOtp = async (
  to: string,
  otp: string,
  subject: string
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.ethereal.email",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER || "",
      pass: process.env.SMTP_PASS || "",
    },
  });

  const message = {
    from: `"Academia Next" <${
      process.env.SMTP_FROM || "no-reply@academia-next.com"
    }>`,
    to,
    subject,
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>${subject}</h2>
        <p>Your OTP code is:</p>
        <h3 style="background: #f5f5f5; padding: 10px; border-radius: 5px;">${otp}</h3>
        <p>This code will expire in 10 minutes.</p>
      </div>
    `,
  };

  const info = await transporter.sendMail(message);

  // Log the URL if using ethereal for testing
  if (process.env.NODE_ENV !== "production") {
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
};
