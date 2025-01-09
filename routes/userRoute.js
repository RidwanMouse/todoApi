import express  from 'express';
const router = express.Router();
import { createNewUser } from '../controllers/userController.js';
router.post('/new',createNewUser)

export default router;