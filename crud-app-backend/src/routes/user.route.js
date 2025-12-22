import { Router } from "express";
import {
  userRegister,
  loginUser,
  logoutUser,
  currentUser,
  updateProfile,
  verifyEmail,
  updatePassword,
  resetPassword,
  forgotPassword,
  resendEmailVerificationLink,
} from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  registerSchema,
  updatePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  resendEmailVerificationLinkSchema,
} from "../validators/user.validator.js";

const router = Router();

router.post("/register", validate(registerSchema), userRegister);
router.get("/verify-email/:emailToken", verifyEmail);
router.post("/login", loginUser);
router.post("/logout", authenticate, logoutUser);
router.get("/currentUser", authenticate, currentUser);
router.patch("/updateProfile", authenticate, updateProfile);
router.patch(
  "/updatePassword",
  validate(updatePasswordSchema),
  authenticate,
  updatePassword
);
router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);
router.get("/reset-password/:resetPasswordToken", resetPassword);
router.post(
  "/reset-password/:resetPasswordToken",
  validate(resetPasswordSchema),
  resetPassword
);
router.post(
  "/resend-email-link",
  validate(resendEmailVerificationLinkSchema),
  resendEmailVerificationLink
);

export default router;
