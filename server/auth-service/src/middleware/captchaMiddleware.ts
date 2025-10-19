import axios from "axios";
import { Request, Response, NextFunction } from "express";

export const verifyCaptcha = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const captchaToken = req.body.captcha;

    if (!captchaToken) {
      return res.status(400).json({ message: "Captcha token is required" });
    }

    if (!process.env.RECAPTCHA_SECRET) {
      return res.status(500).json({ message: "Captcha secret not configured" });
    }

    // Send request to Google reCAPTCHA API
    const params = new URLSearchParams();
    params.append("secret", process.env.RECAPTCHA_SECRET);
    params.append("response", captchaToken);

    const { data } = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      params.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("Captcha verification response:", data);

    if (!data.success) {
      return res.status(400).json({ message: "Captcha verification failed" });
    }

    next();
  } catch (error) {
    console.error("Captcha verification error:", error);
    return res.status(500).json({ message: "Captcha verification error" });
  }
};
