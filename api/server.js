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

// Set 'trust proxy' to 1 if the app is behind a proxy (e.g., Nginx) to ensure secure cookies work correctly
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
    credentials: true, // Allow cookies
  })
);

// === API routes ===
app.use("/api/auth", authRoutes);
app.use("/api/spotify", spotifyRoutes);

// === Serve client application ===
// Serve static files from the client 'dist' directory
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
}

// Handle client-side routing, redirecting all non-API requests to index.html
app.use(
  history({
    index: "/index.html", 
  })
);

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
