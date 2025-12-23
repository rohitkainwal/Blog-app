import { Resend } from "resend";
// ✅ DEBUG: Check if loaded
console.log("🔑 RESEND_API_KEY exists?", !!process.env.RESEND_API_KEY);
console.log("🔑 First 10 chars:", process.env.RESEND_API_KEY?.substring(0, 10));
let resendInstance = null;

export const getResend = () => {
  if (!resendInstance) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not set in environment variables");
    }
    resendInstance = new Resend(process.env.RESEND_API_KEY);
  }
  return resendInstance;
};

export default getResend;