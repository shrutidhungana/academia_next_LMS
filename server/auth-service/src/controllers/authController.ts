import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import {
  createUser,
  findUserByEmail,
  verifyUserEmail,
} from "../models/UserModel";
import { createOtp, getOtp, deleteOtp } from "../models/OtpModel";
import {
  saveRefreshToken,
  deleteRefreshToken,
} from "../models/RefreshTokenModel";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../services/tokenService";
import { sendEmailOtp } from "../utils/emailUtil";
import pool from "../database";
import { imageUploadUtil } from "../utils/cloudinary";

const OTP_EXPIRY_MINUTES = 20;

// -------------------- IMAGE UPLOAD --------------------
export const handleImageUpload = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const result = await imageUploadUtil(req.file.buffer);

    return res.json({
      success: true,
      url: result,
      message: "Image uploaded successfully",
    });
  } catch (error) {
    console.error("Image upload error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Image upload failed" });
  }
};

// -------------------- REGISTER --------------------
export const register = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      username,
      phone,
      email,
      password,
      confirmPassword, // ✅ confirm password
      gender,
      maritalStatus,
      dateOfBirth,
      profilePicture,
      country,
      state,
      city,
      zip,
      address1,
      address2,
      roles,
      organization,
      department,
      jobTitle,
      howDidYouHear,
    } = req.body;

    // ✅ Confirm password validation
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ status: 400, message: "Passwords do not match" });
    }

    const existing = await findUserByEmail(email);
    if (existing) {
      return res
        .status(409)
        .json({ status: 409, message: "Email already registered" });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = await createUser({
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      username,
      phone,
      email,
      password_hash,
      gender,
      marital_status: maritalStatus,
      date_of_birth: dateOfBirth,
      profile_picture: profilePicture,
      country,
      state,
      city,
      zip,
      address1,
      address2,
      roles,
      organization,
      department,
      job_title: jobTitle,
      how_did_you_hear: howDidYouHear,
    });

    // Generate OTP for email verification
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60000);
    await createOtp(user.id, otp, "verify_email", expiresAt);
    await sendEmailOtp(email, otp, "Confirm your email");

    return res.status(201).json({
      status: 201,
      message: "User registered successfully. OTP sent to email.",
      data: { email },
    });
  } catch (err: any) {
    console.error("Registration Error:", err.message, err.stack);
    return res
      .status(500)
      .json({
        status: 500,
        message: "Registration failed",
        error: err.message,
      });
  }
};

// -------------------- CONFIRM EMAIL --------------------
export const confirmEmail = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const savedOtp = await getOtp(user.id, "verify_email");
    if (
      !savedOtp ||
      savedOtp.otp !== otp ||
      new Date(savedOtp.expires_at) < new Date()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    await verifyUserEmail(user.id);
    await deleteOtp(user.id, "verify_email");

    return res.json({ status: 200, message: "Email verified successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, message: "Verification failed" });
  }
};

// -------------------- LOGIN --------------------
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user || !user.is_email_verified) {
      return res
        .status(401)
        .json({ message: "Email not verified or user not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user.id, user.roles);
    const refreshToken = generateRefreshToken(user.id);
    const refreshExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await saveRefreshToken(user.id, refreshToken, refreshExpiry);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ message: "Login successful", accessToken });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ message: "Login failed" });
  }
};

// -------------------- LOGOUT --------------------
export const logout = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.sendStatus(204);

    await deleteRefreshToken(token);
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.json({ message: "Logout successful" });
  } catch (err) {
    return res.status(500).json({ message: "Logout failed" });
  }
};

// -------------------- REFRESH TOKEN --------------------
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const payload = verifyRefreshToken(token) as any;
    const accessToken = generateAccessToken(payload.userId, []);

    return res.json({ accessToken });
  } catch (err) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};

// -------------------- FORGOT PASSWORD --------------------
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60000);
    await createOtp(user.id, otp, "reset_password", expiresAt);
    await sendEmailOtp(email, otp, "Reset your password");

    return res.json({ message: "OTP sent to email" });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// -------------------- RESET PASSWORD --------------------
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const savedOtp = await getOtp(user.id, "reset_password");
    if (
      !savedOtp ||
      savedOtp.otp !== otp ||
      new Date(savedOtp.expires_at) < new Date()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const password_hash = await bcrypt.hash(newPassword, 10);
    await deleteOtp(user.id, "reset_password");

    await pool.query(
      "UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2",
      [password_hash, user.id]
    );

    return res.json({ message: "Password reset successful" });
  } catch (err) {
    return res.status(500).json({ message: "Reset failed" });
  }
};

// -------------------- GET AUTH USER --------------------
export const getAuthUser = async (req: Request, res: Response) => {
  const user = (req as any).user;
  return res.json({ message: "Authenticated", data: user });
};

// -------------------- RESEND OTP --------------------
export const resendOtp = async (req: Request, res: Response) => {
  try {
    const { email, purpose = "verify_email" } = req.body;
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60000);

    await deleteOtp(user.id, purpose);
    await createOtp(user.id, otp, purpose, expiresAt);
    await sendEmailOtp(email, otp, "Your new OTP code");

    return res.json({ status: 200, message: "New OTP sent to email" });
  } catch (err: any) {
    console.error("Resend OTP Error:", err.message);
    return res.status(500).json({ message: "Resend OTP failed" });
  }
};
