import getResend from "../config/resend.config.js";

export const sendEmail = async (to, subject, text, html) => {
  console.log("Sending email to:", to);
  
  try {
    const resend = getResend(); // ✅ Get instance when needed
    
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to,
      subject,
      text,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      throw new Error(error.message);
    }

    console.log("Email sent successfully:", data);
    return data;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
};