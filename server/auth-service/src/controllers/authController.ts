import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../database";
import {
  createUser,
  findUserByEmail,
  findUserById,
  verifyUserEmail,
} from "../models/UserModel";
import { createOtp, getOtp, deleteOtp } from "../models/OtpModel";
import {
  saveRefreshToken,
  deleteRefreshToken,
  getRefreshToken,
} from "../models/RefreshTokenModel";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../services/tokenService";
import { sendEmailOtp } from "../utils/emailUtil";
import { imageUploadUtil } from "../utils/cloudinary";

const OTP_EXPIRY_MINUTES = 2;

// -------------------- IMAGE UPLOAD --------------------
export const handleImageUpload = async (req: Request, res: Response) => {
  try {
    if (!req.file)
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });

    const url = await imageUploadUtil(req.file.buffer);

    return res.json({
      success: true,
      url,
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
      confirmPassword,
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

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existing = await findUserByEmail(email);
    if (existing)
      return res.status(409).json({ message: "Email already registered" });

    const password_hash = await bcrypt.hash(password, 10);

    const user = await createUser({
      first_name: firstName,
      middle_name: middleName || null,
      last_name: lastName,
      username,
      phone: phone || null,
      email,
      password_hash,
      gender: gender || null,
      marital_status: maritalStatus || null,
      date_of_birth: dateOfBirth ? new Date(dateOfBirth) : null,
      profile_picture: profilePicture || null,
      country,
      state: state || null,
      city: city || null,
      zip: zip || null,
      address1: address1 || null,
      address2: address2 || null,
      roles: roles || [
        "Super-Admin",
        "Admin",
        "Tenant Admin",
        "Instructor",
        "Student",
      ],
      organization: organization || null,
      department: department || null,
      job_title: jobTitle || null,
      how_did_you_hear: howDidYouHear || null,
    });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60000);

    await createOtp(user.id, otp, "verify_email", expiresAt);
    await sendEmailOtp(email, otp, "Confirm your email");

    return res.status(201).json({
      message: "User registered successfully. OTP sent to email.",
      email,
    });
  } catch (err: any) {
    console.error("Registration Error:", err);
    return res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};

// -------------------- CONFIRM EMAIL --------------------
export const confirmEmail = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const savedOtp = await getOtp(user.id, "verify_email");
    if (!savedOtp || savedOtp.otp !== otp || savedOtp.expires_at < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    await verifyUserEmail(user.id);
    await deleteOtp(user.id, "verify_email");

    return res.json({ message: "Email verified successfully" });
  } catch (err) {
    console.error("Confirm Email Error:", err);
    return res.status(500).json({ message: "Verification failed" });
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
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = generateAccessToken(user.id, user.roles);
    const refreshToken = generateRefreshToken(user.id);
    const refreshExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await saveRefreshToken(user.id, refreshToken, refreshExpiry);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ data: user, message: "Login successful", accessToken });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ message: "Login failed" });
  }
};

// -------------------- LOGOUT --------------------
export const logout = async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.refreshToken;

    if (token) {
      await deleteRefreshToken(token).catch((err) =>
        console.error("Failed to delete refresh token:", err)
      );
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.json({ message: "Logout successful" });
  } catch (err) {
    console.error("Unexpected logout error:", err);
    return res.json({ message: "Logout successful" });
  }
};

// -------------------- REFRESH TOKEN --------------------
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized: No refresh token" });

    const savedToken = await getRefreshToken(token);
    if (!savedToken)
      return res.status(403).json({ message: "Refresh token invalid" });

    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as any;
    const user = await findUserById(payload.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newAccessToken = generateAccessToken(user.id, user.roles);
    return res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("Refresh Token Error:", err);
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
    console.error("Forgot Password Error:", err);
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
    if (!savedOtp || savedOtp.otp !== otp || savedOtp.expires_at < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const password_hash = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { password_hash, updated_at: new Date() },
    });

    await deleteOtp(user.id, "reset_password");

    return res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset Password Error:", err);
    return res.status(500).json({ message: "Reset failed" });
  }
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

    return res.json({ message: "New OTP sent to email" });
  } catch (err: any) {
    console.error("Resend OTP Error:", err);
    return res.status(500).json({ message: "Resend OTP failed" });
  }
};

// -------------------- GET AUTH USER --------------------
export const getAuthUser = async (req: Request, res: Response) => {
  const user = (req as any).user;
  return res.json({ message: "Authenticated", data: user });
};
