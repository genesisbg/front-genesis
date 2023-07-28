"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _userController = require("../controllers/user.controller.js");
var _token = require("../middlewares/token.js");
var _valEstado = require("../middlewares/valEstado.js");
var user = (0, _express.Router)();

// Vista perfil de usuario
user.get("/perfil", _token.validateToken, _userController.userController.render);
user.get("/pqr", _token.validateToken, _userController.userController.pqr);
var _default = user;
exports["default"] = _default;