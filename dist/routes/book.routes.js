"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _bookController = require("../controllers/book.controller.js");
var _token = require("../middlewares/token.js");
var _valEstado = require("../middlewares/valEstado.js");
var book = (0, _express.Router)();

// vista para la pagina individual
book.get("/pagina", _valEstado.validateState, _bookController.bookController.infoLibro);

// vista autentificacion de prestamo
book.get("/auth", _token.validateToken, _valEstado.validateState, _bookController.bookController.authPrestamo);
// vista para la confirmacion de prestamo
book.get("/confirm", _token.validateToken, _valEstado.validateState, _bookController.bookController.confirmPrestamo);
// vista para el prestamo
book.get("/prestamo", _token.validateToken, _valEstado.validateState, _bookController.bookController.prestamo);
//Vista para el prestamo realizado
book.post("/prestamoLibro", _token.validateToken, _bookController.bookController.prestamoLibro);
book.get("/detalle", _token.validateToken, _bookController.bookController.detalle);
var _default = book;
exports["default"] = _default;