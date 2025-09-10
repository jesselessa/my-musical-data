import express from "express";
import { getProfile } from "../controllers/spotify.js";

const router = express.Router();

router.get("/profile", getProfile);

export default router;
