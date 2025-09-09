import "dotenv/config";
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

//* Routes
import spotifyRoute from "./routes/spotify.js";

const app = express();
const PORT = process.env.PORT || 3006;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//* Middlewares
app.use(express.json());
app.use(
  cors({
    origin: [process.env.CLIENT_URL || "http://localhost:5173"],
  })
);

//* API routes
app.use("/api/spotify", spotifyRoute);

//* Serve static files in production
// app.use(express.static(path.join(__dirname, "../client/dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
// });

//* Handle errors globally
app.use((err, req, res, next) => {
  console.error(err.stack);
  s;
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
});

//* Start server
app.listen(PORT, console.log(`✅ Server running on port ${PORT}`));
