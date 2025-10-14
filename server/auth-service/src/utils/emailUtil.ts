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

  const now = new Date();
  const formattedDate = now.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const message = {
    from: `"Academia Next" <${
      process.env.SMTP_FROM || "no-reply@academia-next.com"
    }>`,
    to,
    subject,
    html: `
      <div style="margin: 0; padding: 0; background: #f4f6fb; font-family: 'Inter', 'Segoe UI', Roboto, sans-serif;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: #f4f6fb; padding: 40px 0;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 540px; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 8px 28px rgba(0,0,0,0.08);">
                
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 30px 20px; text-align: center;">
                    <img src="https://cdn-icons-png.flaticon.com/512/1048/1048953.png" width="56" height="56" alt="Academia Next" style="margin-bottom: 10px;" />
                    <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #ffffff;">Academia Next</h1>
                    <p style="margin: 6px 0 0; color: #e0e7ff; font-size: 14px;">${formattedDate}</p>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding: 40px 40px 30px 40px; text-align: center;">
                    <h2 style="color: #1e293b; font-size: 22px; margin-bottom: 14px;">${subject}</h2>
                    <p style="color: #475569; font-size: 15px; line-height: 1.7; margin-bottom: 28px;">
                      We received a request to verify your email. Please use the following OTP to complete your action.
                      <br>This code will expire in <strong>2 minutes</strong>.
                    </p>

                    <!-- OTP Box -->
                    <div style="display: inline-block; background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.3); color: #4f46e5; padding: 18px 32px; border-radius: 14px; font-size: 28px; font-weight: 700; letter-spacing: 5px; backdrop-filter: blur(8px); box-shadow: 0 4px 20px rgba(99,102,241,0.25); margin-bottom: 35px;">
                      ${otp}
                    </div>

                    <p style="color: #94a3b8; font-size: 14px; margin: 0 0 8px;">
                      Requested on <strong>${formattedDate}</strong>
                    </p>
                    <p style="color: #94a3b8; font-size: 13px; margin: 0;">
                      If this wasn’t you, you can safely ignore this email.
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background: #f9fafb; text-align: center; padding: 22px 15px; color: #94a3b8; font-size: 12px;">
                    <p style="margin: 0 0 8px;">© ${new Date().getFullYear()} Academia Next. All rights reserved.</p>
                   
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    `,
  };

  const info = await transporter.sendMail(message);

  if (process.env.NODE_ENV !== "production") {
    console.log("📩 Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
};
