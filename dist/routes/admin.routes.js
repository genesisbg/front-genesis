"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _adminController = require("../controllers/admin.controller.js");
var _token = require("../middlewares/token.js");
var _valAdmin = require("../middlewares/valAdmin.js");
var admin = (0, _express.Router)();

// Vista principal del administrador
admin.get("/", _token.validateToken, _valAdmin.validateAdmin, _adminController.adminController.dash);

//vista para el formulario para agregar libros
admin.get("/actualizarLibro", _token.validateToken, _valAdmin.validateAdmin, _adminController.adminController.actualizarLibro);

//vista para el formulario la devolucion de libros
admin.get("/devolucion", _token.validateToken, _valAdmin.validateAdmin, _adminController.adminController.devolucion);

//vista de usuarios para administration
admin.get("/usuarios", _token.validateToken, _valAdmin.validateAdmin, _adminController.adminController.dashUsuarios);
admin.get("/actualizar", _token.validateToken, _valAdmin.validateAdmin, _adminController.adminController.actualizar);
admin.post("/updateUser", _token.validateToken, _valAdmin.validateAdmin, _adminController.adminController.update);
admin.post("/insertarUsuario", _token.validateToken, _valAdmin.validateAdmin, _adminController.adminController.insertarUsuario);
admin.get("/ban", _token.validateToken, _valAdmin.validateAdmin, _adminController.adminController.banUsuario);

//vista de los libros para administration
admin.get("/libros", _token.validateToken, _valAdmin.validateAdmin, _adminController.adminController.dashLibros);
admin.post("/insertarLibros", _token.validateToken, _valAdmin.validateAdmin, _adminController.adminController.insertarLibros);
admin.post("/editarLibros", _token.validateToken, _valAdmin.validateAdmin, _adminController.adminController.editarLibros);
admin.get("/eliminarLibros", _token.validateToken, _valAdmin.validateAdmin, _adminController.adminController.eliminarLibros);

//vista de los prestamos para administration
admin.get("/prestamos", _token.validateToken, _valAdmin.validateAdmin, _adminController.adminController.dashPrestamos);
admin.get("/eliminarPrestamos", _token.validateToken, _valAdmin.validateAdmin, _adminController.adminController.eliminarPrestamos);
admin.get("/pdf", _token.validateToken, _valAdmin.validateAdmin, _adminController.adminController.pdf);
admin.get("/excel", _token.validateToken, _valAdmin.validateAdmin, _adminController.adminController.excel);
admin.get("/pdfPrestamo", _token.validateToken, _valAdmin.validateAdmin, _adminController.adminController.pdfPrestamo);
admin.get("/excelP", _token.validateToken, _valAdmin.validateAdmin, _adminController.adminController.excelP);
var _default = admin;
exports["default"] = _default;