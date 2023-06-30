import { Router } from "express";
import { userController } from "../controllers/user.controller.js"
import { validateToken } from "../middlewares/token.js";
import { validateState } from "../middlewares/valEstado.js";

const user = Router();

// Vista perfil de usuario

user.get("/perfil", validateToken, userController.render,);
user.get("/pdfPrestamo", validateToken,userController.pdfPrestamo)
user.get("/excelP", validateToken,  userController.excelP)
export default user;
