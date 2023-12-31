import { Router } from "express";
import{adminController} from '../controllers/admin.controller.js'
import { validateToken } from "../middlewares/token.js";
import { validateAdmin } from "../middlewares/valAdmin.js";

const admin = Router();

// Vista principal del administrador
admin.get("/", validateToken, validateAdmin, adminController.dash);

//vista para el formulario para agregar libros
admin.get("/actualizarLibro", validateToken, validateAdmin, adminController.actualizarLibro)

//vista para el formulario la devolucion de libros
admin.get("/devolucion", validateToken, validateAdmin, adminController.devolucion );

//vista de usuarios para administration
admin.get("/usuarios", validateToken, validateAdmin, adminController.dashUsuarios );
admin.get("/actualizar", validateToken, validateAdmin, adminController.actualizar);
admin.post("/updateUser", validateToken, validateAdmin, adminController.update);
admin.post("/insertarUsuario", validateToken, validateAdmin, adminController.insertarUsuario)
admin.get("/ban", validateToken, validateAdmin, adminController.banUsuario)

//vista de los libros para administration
admin.get("/libros", validateToken, validateAdmin, adminController.dashLibros);
admin.post("/insertarLibros", validateToken, validateAdmin, adminController.insertarLibros)
admin.post("/editarLibros", validateToken, validateAdmin, adminController.editarLibros)
admin.get("/eliminarLibros", validateToken, validateAdmin, adminController.eliminarLibros )

//vista de los prestamos para administration
admin.get("/prestamos", validateToken, validateAdmin, adminController.dashPrestamos);
admin.get("/eliminarPrestamos", validateToken, validateAdmin, adminController.eliminarPrestamos);


admin.get("/pdf", validateToken, validateAdmin, adminController.pdf)
admin.get("/excel", validateToken, validateAdmin, adminController.excel)

admin.get("/pdfPrestamo", validateToken, validateAdmin, adminController.pdfPrestamo)
admin.get("/excelP", validateToken, validateAdmin, adminController.excelP)

export default admin;
