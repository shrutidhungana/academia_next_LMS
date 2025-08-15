import axios from "axios";
import { Request, Response, NextFunction } from "express";

export const verifyCaptcha = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const captcha = req.body.captcha;
  if (!captcha) return res.status(400).json({ message: "Captcha required" });

  if (!process.env.RECAPTCHA_SECRET) {
    return res.status(500).json({ message: "Captcha secret not configured" });
  }

  try {
    const params = new URLSearchParams();
    params.append("secret", process.env.RECAPTCHA_SECRET);
    params.append("response", captcha);

    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      params
    );

    const { success, score } = response.data;
    if (!success || (score !== undefined && score < 0.5)) {
      return res.status(400).json({ message: "Captcha verification failed" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Captcha verification error" });
  }
};
