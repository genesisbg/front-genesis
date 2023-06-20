import { Router } from "express";
import { userController } from "../controllers/user.controller.js"
const user = Router();

// Vista perfil de usuario
user.get("/perfil", userController.render);

export default user;
