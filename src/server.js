import express from "express";
import registerRoutes from "./auth/register/routes/register.js";
import privateRoutes from "./users/routes/userRoutes.js";
import loginRoutes from "./auth/login/router/login.js";
import cors from 'cors'

export const app = express();
app.use(express.json());
app.use(cors());

// Registro de rotas
app.use(registerRoutes);
app.use(loginRoutes);
app.use(privateRoutes);

app.listen(3000, () => {
  console.log(`
🚀 Servidor Rodando
🌐 http://localhost:3000
  `);
});
