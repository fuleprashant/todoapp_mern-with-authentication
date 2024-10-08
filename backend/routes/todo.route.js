import express from "express";
import { createTodo } from "../controller/todo.controller";

const router = express.Router();

router.post("/create", createTodo);
export default router;
