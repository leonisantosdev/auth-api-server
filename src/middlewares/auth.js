import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if(!token) {
    return res.status(401).json({ message: "Acesso negado" });
  }

  try {
    jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
}

export default auth