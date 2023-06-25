import { Router } from "express";
import fetch from "node-fetch";
const admin = Router();
import{adminController} from '../controllers/admin.controller.js'
// Vista principal del administrador
admin.get("/",adminController.dash);

//vista para el formulario para agregar libros
admin.get("/agregar", adminController.agregarLibros );

//vista para el formulario la devolucion de libros
admin.get("/devolucion", adminController.devolucion );

//vista de usuarios para administration
admin.get("/usuarios", adminController.dashUsuarios );

admin.post("/insertarUsuario", adminController.insertarUsuario)

admin.get("/eliminarUsuario", adminController.eliminarUsuario)

//vista de los libros para administration
admin.get("/libros", adminController.dashLibros);

admin.get("/eliminarLibros", adminController.eliminarLibros )
//vista de los prestamos para administration
admin.get("/prestamos",adminController.dashPrestamos);
admin.get("/eliminarPrestamos", adminController.eliminarPrestamos)


export default admin;
