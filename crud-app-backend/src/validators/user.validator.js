import joi from "joi";

export const registerSchema = joi.object({
  username: joi.string().min(5).max(50).required(),
  email: joi.string().min(5).max(50).required(),
  password: joi.string().min(5).max(50).required(),
  contactNumber: joi
    .string()
    .length(10)
    .required()
    .pattern(/^[6-9]\d{9}$/)
    .message("Invalid Mobile Number"),
});

export const updatePasswordSchema = joi.object({
  password: joi.string().min(5).max(50).required(),
});

export const forgotPasswordSchema = joi.object({
  email: joi.string().min(5).max(50).required().email(),
});

export const resetPasswordSchema = joi.object({
  password: joi.string().min(5).max(50).required(),
});

export const resendEmailVerificationLinkSchema = joi.object({
  email: joi.string().min(5).max(50).required().email(),
});
