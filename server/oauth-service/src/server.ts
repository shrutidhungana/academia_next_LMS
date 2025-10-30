// src/server.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./database";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5100;

// ✅ Middleware
app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Passport initialize (no session because JWT)
app.use(passport.initialize());


app.get("/", (req, res) => res.send("OAuth Service Running"));



app.listen(PORT, () => {
  console.log(`🚀 OAuth Service listening on port ${PORT}`);
});
