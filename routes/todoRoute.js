import express from "express";
const router = express.Router();
import {
  createNewTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
  filterTodo,
} from "../controllers/todoController.js";

router.get("/all", getAllTodos);
router.post("/new", createNewTodo);
router.put("/update/:id", updateTodo);
router.delete("/delete/:id", deleteTodo);
router.get("/filter/:id", filterTodo);
export default router;
