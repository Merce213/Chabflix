import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
// Import Routes
import authRoutes from "./src/routes/auth.js";

dotenv.config();
const app = express();

// Middlewares
app.use(
    cors({
        origin: "https://chabflix.vercel.app/",
        credentials: true,
    })
);
app.use(bodyParser.json());
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRoutes);

// Start Server
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(
        `Server is running on port ${port}, click here => http://localhost:${port}`
    );
});
