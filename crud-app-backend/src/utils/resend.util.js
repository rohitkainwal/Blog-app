import getResend from "../config/resend.config.js";

export const sendEmail = async (to, subject, text, html) => {
  if (!process.env.RESEND_API_KEY) {
    console.error("❌ RESEND_API_KEY missing");
    return;
  }    
  
  console.log("Sending email to:", to);
  
  try {
    const resend = getResend(); // ✅ Get instance when needed
    
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'support@send.rorprojects.site',
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