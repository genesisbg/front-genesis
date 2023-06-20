import { Router } from "express";
import fetch from "node-fetch";
import { homeController } from "../controllers/home.controller.js";
const home = Router();

// Vista principal de la pagina
home.get("/", homeController.index);

// vista para la pagina por genero
home.get("/genero", (req, res) => {
  res.render("pagina-genero.ejs");
});

export default home;
