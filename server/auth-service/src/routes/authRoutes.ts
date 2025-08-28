import express, { Router, Request, Response } from "express";
import {
  register,
  confirmEmail,
  login,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
  getAuthUser,
  resendOtp,
  handleImageUpload
} from "../controllers/authController";
import { verifyAccessToken } from "../services/tokenService";
import { upload } from "../utils/cloudinary";

const router: Router = express.Router();

// Public routes
router.post("/register", register);
router.post("/confirm-email", confirmEmail);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);
router.post("/resend-otp", resendOtp);
router.post("/upload-image", upload.single("image"), handleImageUpload);

// Protected route
router.get("/me", verifyAccessToken, getAuthUser);

router.get("/check-auth", verifyAccessToken, (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "User is authenticated",
    user: (req as any).user, // user payload from middleware
  });
});

export default router;
