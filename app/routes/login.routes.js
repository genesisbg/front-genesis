import { Router } from "express";
import { loginController } from "../controllers/login.controller.js";

const login = Router();

// Vista de inicio de sesion
login.get("/login", async (req, res) => {
  res.render("login");
});

// Validacion de datos
login.get("/auth", loginController.authentication);

export default login;
