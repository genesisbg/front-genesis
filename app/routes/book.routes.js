import { Router } from "express";
import { bookController } from "../controllers/book.controller.js";
import { validateToken } from "../middlewares/token.js";
const book = Router();

// vista para la pagina individual
book.get("/pagina", bookController.infoLibro);

// vista autentificacion de prestamo
book.get("/auth", validateToken, bookController.authPrestamo);
// vista para la confirmacion de prestamo
book.get("/confirm", validateToken, bookController.confirmPrestamo);
// vista para el prestamo
book.get("/prestamo", validateToken, bookController.prestamo);
//Vista para el prestamo realizado
book.post("/prestamoLibro",validateToken, bookController.prestamoLibro);

export default book;
