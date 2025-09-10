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

// Creates an Express application
const app = express();
const PORT = process.env.PORT || 3006;

// For ES modules, this helps resolve file paths relative to the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// --- Middlewares ---
// Parses incoming requests with JSON payloads (req.body)
app.use(express.json());

// Enables Cross-Origin Resource Sharing (CORS) for the specified client URL
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true, // Allows cookies
  })
);

// Parses cookies attached to the client request object (req.cookies)
app.use(cookieParser());

// API routes
app.use("/api/auth", authRoutes); // Authentication
app.use("/api/spotify", spotifyRoutes); // Spotify data routes

// Production configuration for serving static files
if (process.env.NODE_ENV === "production") {
  // Middleware to serve a single-page app (SPA) correctly
  // It rewrites requests to the client's index.html file, which is necessary for client-side routing
  app.use(
    history({
      verbose: true,
      rewrites: [
        // These rewrites ensure that the server doesn't return a 404 for client-side routes
        // For example, if a user navigates directly to /login, this will serve the root index.html
        { from: /\/login/, to: "/login" },
        { from: /\/callback/, to: "/callback" },
        { from: /\/refresh/, to: "/refresh" },
      ],
    })
  );

  // Serves all static files from the client's build directory
  app.use(express.static(path.join(__dirname, "../client/dist")));

  // Catch-all route for any requests not handled by previous routes
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
app.listen(PORT, console.log(`✅ Server running on port ${PORT}`));
