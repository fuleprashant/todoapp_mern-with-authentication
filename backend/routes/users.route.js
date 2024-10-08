import express from "express";
import { Login, Logout, SignUp } from "../controller/user.controller.js";

const router = express.Router();

router.post("/signup", SignUp);
router.post("/login", Login);
router.get("/logout", Logout);

export default router;
