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

// Create an Express application
const app = express();
const PORT = process.env.PORT;

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Trust proxy headers (because Nginx terminates HTTPS and forwards headers)
//! ⚠️ Crucial for secure cookies (https detection) and correct IP logging
app.set("trust proxy", 1);

// === Middlewares ===
// Parse JSON request bodies
app.use(express.json());

// Parse cookies from requests
app.use(cookieParser());

// Use CORS middleware
const allowedOrigins = [process.env.CLIENT_URL];
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    optionsSuccessStatus: 204,
    credentials: true, // Allow cookies
  })
);

// === API routes ===
app.use("/api/auth", authRoutes);
app.use("/api/spotify", spotifyRoutes);

// === Serve client in production ===
if (process.env.NODE_ENV === "production") {
  //! ⚠️ The order of the following two middlewares is crucial !!!
  // 1. The history middleware handles client-side routing for non-API requests and non-static files
  // It intercepts these requests and rewrites them to /index.html instead of letting Express send a 404 response
  // The modified request (/index.html) is then passed to the next middleware (express.static)
  app.use(
    history({
      index: "/index.html",
    })
  );

  // 2. The express.static middleware serves static files from the React/Vite build directory ('client/dist')
  // The middleware express.static now sees a request for /index.html
  // It finds this file in the 'dist' directory and serves it to the client
  app.use(express.static(path.join(__dirname, "../client/dist")));
}

// === Global error handler ===
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
});

// === Start the server ===
app.listen(PORT, (error) => {
  if (error) {
    console.error("❌ Error connecting to server:", error);
  } else {
    console.log(`✅ Server running on port ${process.env.PORT}`);
  }
});
