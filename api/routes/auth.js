import express from "express";
// Controllers
import { login, callback, refresh } from "../controllers/auth.js";

// Express router
const router = express.Router();

router.get("/login", login);
router.get("/callback", callback);
router.get("/refresh", refresh);

export default router;
