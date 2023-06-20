import { Router } from "express";
const admin = Router();

// Vista principal del administrador
admin.get("/", (req, res) => {
  res.render("dash.ejs");
});

//vista para el formulario para agregar libros
admin.get("/agregar", (req, res) => {
  res.render("agregar-libros.ejs");
});

//vista para el formulario la devolucion de libros
admin.get("/devolucion", (req, res) => {
  res.render("devolucion.ejs");
});
//vista de usuarios para administration
admin.get("/usuarios", (req, res) => {
  res.render("dashusuarios.ejs");
});
//vista de los libros para administration
admin.get("/libros", (req, res) => {
  res.render("dashlibros.ejs");
});
//vista de los prestamos para administration
admin.get("/prestamos", (req, res) => {
  res.render("dashprestamos.ejs");
});

export default admin;
