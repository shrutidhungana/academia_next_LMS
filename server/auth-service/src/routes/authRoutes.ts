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
  handleImageUpload,
} from "../controllers/authController";
import { authenticate } from "../middleware/authMiddleware";
import { checkRole } from "../middleware/roleMiddleware";
import { verifyCaptcha } from "../middleware/captchaMiddleware";
import { upload } from "../utils/cloudinary";

const router: Router = express.Router();

// -------------------- Public routes --------------------


router.post("/register", verifyCaptcha, register);
router.post("/confirm-email", confirmEmail);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);
router.post("/resend-otp", resendOtp);
router.post("/upload-image", upload.single("file"), handleImageUpload);

// -------------------- Protected routes --------------------


router.get("/me", authenticate, getAuthUser);


router.get(
  "/check-auth",
  authenticate,
  checkRole("Super-Admin", "Admin", "Tenant Admin", "Instructor", "Student"),
  (req: Request, res: Response) => {
    res.json({
      success: true,
      message: "User is authenticated",
      user: (req as any).user,
    });
  }
);

export default router;
