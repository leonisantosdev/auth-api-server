import { prisma } from "../../config/prisma/prismaClient.js";

export const listUsers = async (req, res) => {
  try {
    console.log('teste')
    const users = await prisma.user.findMany({
      select: {
        name: true,
        email: true,
        id: true
      }
    });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar usuários" });
  }
}