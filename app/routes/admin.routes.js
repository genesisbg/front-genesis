import { Router } from "express";
import{adminController} from '../controllers/admin.controller.js'
import { validateToken } from "../middlewares/token.js";

const admin = Router();

// Vista principal del administrador
admin.get("/", validateToken, adminController.dash);

//vista para el formulario para agregar libros
admin.get("/agregar", validateToken, adminController.agregarLibros );

//vista para el formulario la devolucion de libros
admin.get("/devolucion", validateToken, adminController.devolucion );

//vista de usuarios para administration
admin.get("/usuarios", validateToken, adminController.dashUsuarios );
admin.post("/insertarUsuario", validateToken, adminController.insertarUsuario)
admin.get("/eliminarUsuario", validateToken, adminController.eliminarUsuario)

//vista de los libros para administration
admin.get("/libros", validateToken, adminController.dashLibros);
admin.post("/insertarLibros", validateToken, adminController.insertarLibros)
admin.post("/editarLibros", validateToken, adminController.editarLibros)
admin.get("/eliminarLibros", validateToken, adminController.eliminarLibros )

//vista de los prestamos para administration
admin.get("/prestamos", validateToken, adminController.dashPrestamos);
admin.get("/eliminarPrestamos", validateToken, adminController.eliminarPrestamos)


export default admin;
