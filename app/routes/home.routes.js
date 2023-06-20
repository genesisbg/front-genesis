import { Router } from "express";
import { homeController } from "../controllers/home.controller.js";
import fetch from "node-fetch";
const home = Router();

// Vista principal de la pagina
home.get("/", homeController.index);

// vista para la pagina por genero
home.get("/genero", (req, res) => {
  res.render("pagina-genero.ejs");
});

export default home;
