import crypto  from 'crypto';
import userModel from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import ApiResponse from "../utils/ApiResponse.util.js";
import CustomError from "../utils/CustomError.util.js";
import { generateToken } from "../utils/jwt.util.js";
import { sendEmail } from "../utils/resend.util.js";

// register user
export const userRegister = asyncHandler(async (req, res, next) => {
  const { username, email, password, contactNumber } = req.body;

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return next(new CustomError(400, "User already exists"));
  }

  // create user
  const newUser = new userModel({
    username,
    email,
    password,
    contactNumber,
  });

  let emailVerificationToken= newUser.generateEmailVerificationToken();
  await newUser.save();

 let verification_url = `${process.env.FRONTEND_URL}/email-verify/${emailVerificationToken}`;


//! send a mail -->

try {
  // In user.controller.js, your email template is already great!
// But you can add a fallback text version:

await sendEmail(
  email,
  "Email Verification",
  `Hi ${email}, please verify your email using this link: ${verification_url}`, // text fallback
  `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
    <h2 style="color: #333; text-align: center;">Verify Your Email</h2>
    <p style="font-size: 16px; color: #555;">
      Hi, <strong>${email}</strong>!<br/>
      Thank you for registering. Please verify your email address by clicking the button below.
    </p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${verification_url}" 
         style="padding: 12px 25px; background-color: #1d4ed8; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
         Verify Email
      </a>
    </div>
    <p style="font-size: 14px; color: #888; text-align: center;">
      Or copy this token manually if the button doesn't work: <br/>
      <strong>${emailVerificationToken}</strong>
    </p>
    <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;"/>
    <p style="font-size: 12px; color: #999; text-align: center;">
      This verification link will expire in 1 hour. If you did not request this email, please ignore it.
    </p>
  </div>`
);
} catch (error) {
  console.error("Email sending failed:", error.message);
}

  new ApiResponse(201, "User registered successfully", newUser).send(res);
});
//~ http://localhost:9000/api/user/verify-email/2723f7db79d7e5cc92c42e4da2a18132e505e7a64a3e3dbbb040271e6b002a01

//verifyEmail
export const verifyEmail = asyncHandler(async (req,res,next)=>{
 let { emailToken } = req.params;
  let hashedEmailToken = crypto
    .createHash("sha256")
    .update(emailToken)
    .digest("hex");

    let user = await userModel.findOne({
      emailVerificationToken: hashedEmailToken,
      emailVerificationTokenExpiry:{ $gt: Date.now()},
    });
    if(!user) return next(new CustomError(400, "token Expired"))

    if(user.isVerified) return next(new CustomError(400, "user already verified"));

    user.isVerified = true;
    user.emailVerificationToken=undefined;  
    user.emailVerificationTokenExpiry= undefined;
    await user.save();

    new ApiResponse(200, "email verified successfully").send(res);

});

export const resendEmailVerificationLink = asyncHandler(async(req,res,next)=>{
  const {email} = req.body;
   if (!email) {
    return next(new CustomError(400, "Email is required"));
  }
  
  let existingUser = await userModel.findOne({ email });

if (!existingUser) {
  return next(new CustomError(404, "User not found"));
}

if (existingUser.isVerified) {
  return next(new CustomError(400, "Email already verified"));
}

  let emailVerificationToken = existingUser.generateEmailVerificationToken();
  await existingUser.save();

  let verification_url = `${process.env.FRONTEND_URL}/email-verify/${emailVerificationToken}`;

  //! send a mail -->
    await sendEmail(
      email,
      "Email Verification",
      "Resend Verification Link",
      `<h1> this is for verification</h1> <a href="${verification_url}">Click Here</a> <h3> ${emailVerificationToken} </h3>`
    );
  new ApiResponse(200, "Email Verification Link Sent Successfully").send(res);
})

// login user
export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const existingUser = await userModel.findOne({ email });

  if (!existingUser) {
    return next(new CustomError(400, "user not found "));
  }
  // 2. Compare password (IMPORTANT)
  const isMatch = await existingUser.comparePassword(password);
  if (!isMatch) {
    throw new CustomError(400, "Invalid  password");
  }

  let token = generateToken(existingUser._id);
const isProd = process.env.NODE_ENV === "production";

res.cookie("token", token, {
  httpOnly: true,
  secure: isProd,                     // false in local, true in prod
  sameSite: isProd ? "None" : "Lax",  // cross-site only in prod
  maxAge: 7 * 24 * 60 * 60 * 1000,
  ...(isProd && { domain: ".rorprojects.site" }),
}); 



  new ApiResponse(201, "user logged in successfully", existingUser).send(res);
});

// current User
//~ this is for frontend --> check the success, if true means logged in, else not logged in then redirect client to login page or home page
export const currentUser = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false });
  }
  
  // Fetch the full user object from database
  const user = await userModel.findById(req.user._id).select("-password");
  
  if (!user) {
    return next(new CustomError(404, "User not found"));
  }
  
  // Use your ApiResponse format for consistency
  new ApiResponse(200, "User fetched successfully", user).send(res);
});

// logOut user
export const logoutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie("token");
  new ApiResponse(201, "user logged out successfully").send(res);
});


// update User
export const updateProfile = asyncHandler(async(req,res,next)=>{

  // const {email}= req.body;

  // const user = await userModel.findById(req.user._id);
  // console.log(user)
 



  const updateUser = await userModel.findByIdAndUpdate(
    req.user._id,
    req.body,
    {
      new:true,
      runValidators:true,
    }
  );
  
    new ApiResponse(200, "User updated successfully", updateUser).send(res);
});

// update Password
export const updatePassword = asyncHandler(async(req, res,next)=>{

const existingUser = await userModel.findById(req.user._id)


existingUser.password = req.body.password;
await existingUser.save();

new ApiResponse(200, "password updated successfully").send(res);
  
});

export const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  let existingUser = await userModel.findOne({ email });
  if (!existingUser) next(new CustomError(400, "Email Not Found"));

  let resetPasswordToken = existingUser.generateResetPasswordToken();
  await existingUser.save();

  let resetPassword_url = `${process.env.FRONTEND_URL}/reset-password/${resetPasswordToken}`;

  await sendEmail(
    email,
    "Reset Password",
    "Reset Password",
    `<h1> this is for reset password</h1> <a href="${resetPassword_url}">Click Here</a> <h3> ${resetPasswordToken} </h3>`
  );

  new ApiResponse(200, "Reset Password Link Sent Successfully").send(res);
});

//? http://localhost:9000/api/user/reset-password/2fc8c1cc4170c4047e7a2b229684d96a3fcc75f7a24d3eca3441aa92d046fae1


export const resetPassword = asyncHandler(async (req, res, next) => {
  const { resetPasswordToken } = req.params;
  let resetPasswordTokenHashed = crypto
    .createHash("sha256")
    .update(resetPasswordToken)
    .digest("hex");

  const existingUser = await userModel.findOne({
    passwordResetToken: resetPasswordTokenHashed,
    passwordResetTokenExpiry: { $gt: Date.now() },
  });

  if (!existingUser) next(new CustomError(400, "Token Expired"));

  existingUser.password = req.body.password;
  await existingUser.save();

  new ApiResponse(200, "Password Reset Successfully").send(res);
});