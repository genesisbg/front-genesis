import { Router } from "express";
import { userController } from "../controllers/user.controller.js"
import { validateToken } from "../middlewares/token.js";

const user = Router();

// Vista perfil de usuario
user.get("/perfil", validateToken, userController.render);

export default user;
