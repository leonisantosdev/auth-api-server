import { createUserSchema } from "../schemas/createUserSchema.js";
import { prisma } from "../../config/prisma/prismaClient.js";
import { hashPassword } from '../../utils/hashPassword.js'
import { z } from 'zod';

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = createUserSchema.parse(req.body);

    const hashedPassword = await hashPassword(password);
  
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });
  
    res.status(201);
  } catch (error) {
    console.log(error)
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }

    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};