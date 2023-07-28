"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _loginController = require("../controllers/login.controller.js");
var login = (0, _express.Router)();

// Vista de inicio de sesion
login.get("/login", _loginController.loginController.render);

// Vista de inicio de sesion
login.get("/logout", _loginController.loginController.logout);

// Validacion de datos
login.post("/auth", _loginController.loginController.authentication);

// Registro de usuarios
login.post("/regis", _loginController.loginController.registro);
var _default = login;
exports["default"] = _default;