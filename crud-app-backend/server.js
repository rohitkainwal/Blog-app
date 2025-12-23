import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import { connectDB } from "./src/config/database.config.js";
// ✅ DEBUG: Check if loaded
console.log("🔑 RESEND_API_KEY exists?", !!process.env.RESEND_API_KEY);
console.log("🔑 First 10 chars:", process.env.RESEND_API_KEY?.substring(0, 10));
const PORT = process.env.PORT;
connectDB();

app.listen(PORT, (err) => {

  try {
    console.log(`server is runnig at : ${PORT}`);
    console.log("JWT_SECRET_KEY exists:", !!process.env.JWT_SECRET_KEY);
    
  } catch (err) {
    console.log(err);
  }
});
