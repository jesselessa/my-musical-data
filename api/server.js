import "dotenv/config";
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const app = express();
const PORT = process.env.PORT || 3006;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//* Middlewares
app.use(express.json());
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
  })
);

// Test route
app.get("/test", (req, res) => {
  res
    .json({
      message: "test",
      status: "success",
    })
    .status(200);
});

//* Serve static files in production
// app.use(express.static(path.join(__dirname, "../client/dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
// });

//* Handle errors globally
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
});

//* Start server
app.listen(PORT, console.log(`✅ Server running on port ${PORT}`));
