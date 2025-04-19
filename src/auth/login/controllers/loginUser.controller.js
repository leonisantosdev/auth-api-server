import { prisma } from "../../../config/prisma/prismaClient.js";
import { verifyPassword } from "../../../utils/hashPassword.js";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ 
      where: {
        email
      }
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const isMatch = await verifyPassword(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Senha inválida" });
    }

    const token = jwt.sign(
      { id: user.id }, 
        JWT_SECRET, 
      { expiresIn: '7d' }
    );

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao logar, tente novamente" });
  }
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM5MzJiNzY0LWMxNjctNGU4OC1iOThiLTRmZWJjMzE1YjhhOCIsImlhdCI6MTc0NTA3NjUwNCwiZXhwIjoxNzQ1MDc5NTA0fQ.-2wJAqv3Hqz23itbpTIdVSJxwR-UUE6rpZOMoZtyJYY