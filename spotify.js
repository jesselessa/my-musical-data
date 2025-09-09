import express from "express";

// Controllers
import { sendToken, getProfile, getArtist } from "../controllers/spotify.js";

// Express router
const router = express.Router();

router.get("/token", sendToken);
router.get("/profile", getProfile);
router.get("/artist/:id", getArtist);

export default router;
