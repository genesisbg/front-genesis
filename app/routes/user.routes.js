import { Router } from "express";
const user = Router();

// Vista perfil de usuario
user.get("/perfil", (req, res) => {
  res.render("perfil");
});

export default user;
