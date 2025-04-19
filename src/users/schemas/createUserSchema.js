import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  email: z.string().email({ message: "Formato de email inválido" }),
  password: z.string().min(5, { message: "A senha deve ter pelo menos 5 caracteres" })
});