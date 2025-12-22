import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./src/config/database.config.js";

dotenv.config();
const PORT = process.env.PORT;
connectDB();

app.listen(PORT, (err) => {
  try {
    console.log(`server is runnig at : ${PORT}`);
  } catch (err) {
    console.log(err);
  }
});
