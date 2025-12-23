import resend from "../config/resend.config.js";

export const sendEmail = async (to, subject, text, html) => {
  console.log("Sending email to:", to);
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Use this for testing, or your domain later
      to,
      subject,
      html, // Resend uses html directly
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