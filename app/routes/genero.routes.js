import { Router } from "express";
import { validateToken } from "../middlewares/token.js";
import { validateAdmin } from "../middlewares/valAdmin.js";
import { generoController } from "../controllers/genero.controller.js";

const genero = Router();

genero.get("/generos", generoController.genero )