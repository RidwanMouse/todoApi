import express from "express";
const router = express.Router();
import {
  createNewUser,
  getAllUsers,
  updateuser,
} from "../controllers/userController.js";
router.post("/new", createNewUser);
router.get("/all", getAllUsers);
router.put("/update/:id", updateuser);

export default router;
