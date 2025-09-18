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

// Create an Express app
const app = express();
const PORT = process.env.PORT;

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// === Middlewares ===
// Parse JSON request bodies
app.use(express.json());

// Use CORS middleware
const allowedOrigins = [process.env.CLIENT_URL];
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // Allow cookies
  })
);

// Parse cookies from requests
app.use(cookieParser());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/spotify", spotifyRoutes);

// Production setup for static files
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  // Handle client-side routing for Single-Page Applications (SPA)
  app.use(history({ verbose: true }));

  // Serve the SPA's index.html for unknown routes server side
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

// Start the server
app.listen(PORT, (error) => {
  if (error) {
    console.error("❌ Error connecting to server:", error);
  } else {
    console.log(`✅ Server running on port ${process.env.PORT}`);
  }
});
