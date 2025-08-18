import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./database";
import authRoutes from "./routes/authRoutes";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000 ;

app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    // credentials: true,
  })
);
app.use(express.json());



app.get("/", (req, res) => {
  res.send("Auth Service Running");
});

// ✅ Auth routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Auth Service listening on port ${PORT}`);
});
