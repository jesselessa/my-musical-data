import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3006;

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
  })
);

// Start server
app.listen(PORT, console.log(`✅ Server running on port ${PORT}`));
