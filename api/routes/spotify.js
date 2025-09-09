import express from "express";
import { getProfile, getArtist } from "../controllers/spotify.js";

const router = express.Router();

router.get("/profile", getProfile);
router.get("/artist/:id", getArtist);

export default router;
