import { listUsers } from "../controllers/listUsers.controller.js";
import express from 'express';
import auth from '../../middlewares/auth.js'

const router = express.Router();

// Listar Usuários
router.get("/list-users", auth, listUsers);

export default router;