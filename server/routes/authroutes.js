import express from "express";
import { register, login ,getUser,logout } from "../controllers/authcontrol.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getuser/:id", getUser);
router.post("/logout",logout)

export default router;
