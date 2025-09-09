import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import history from "connect-history-api-fallback";

// Routes
import authRoutes from "./routes/auth.js";
import spotifyRoutes from "./routes/spotify.js";

const app = express();
const PORT = process.env.PORT || 8888;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middlewares
app.use(express.json());
app.use(cors({ origin: [process.env.CLIENT_URL || "http://localhost:5173"] }));
app.use(cookieParser());

// API routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/spotify", spotifyRoutes); // User data routes, require user token

// Serve static files in production after API routes to avoid conflicts
if (process.env.NODE_ENV === "production") {
  app.use(history());
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
});

// Start server
app.listen(PORT, console.log(`✅ Server running on port ${PORT}`));
