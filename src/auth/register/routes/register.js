import { createUser } from "../../../users/controllers/createUser.controller.js";
import express from "express";

const router = express.Router();

//Cadastro
router.post("/cadastro", createUser);

export default router;
