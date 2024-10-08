import express from "express";
import { createTodo, getTodo } from "../controller/todo.controller.js";

const router = express.Router();

router.post("/create", createTodo);
router.get("/gettodo", getTodo);

export default router;
