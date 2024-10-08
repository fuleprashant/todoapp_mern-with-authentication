import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  updateTodo,
} from "../controller/todo.controller.js";

const router = express.Router();

router.post("/create", createTodo);
router.get("/gettodo", getTodo);
router.put("/updatetodo/:id", updateTodo);
router.delete("/delete/:id", deleteTodo);

export default router;
