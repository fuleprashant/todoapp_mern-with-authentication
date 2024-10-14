import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  updateTodo,
} from "../controller/todo.controller.js";
import { authenticate } from "../middleware/authorize.js";

const router = express.Router();

router.post("/create", authenticate, createTodo);
router.get("/gettodo", getTodo);
router.put("/updatetodo/:id", updateTodo);
router.delete("/delete/:id", deleteTodo);

export default router;
