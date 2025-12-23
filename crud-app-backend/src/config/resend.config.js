import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config({ quiet: true });

const resend = new Resend(process.env.RESEND_API_KEY);

export default resend;