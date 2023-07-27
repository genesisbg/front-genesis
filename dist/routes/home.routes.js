"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _homeController = require("../controllers/home.controller.js");
var home = (0, _express.Router)();

// Vista principal de la pagina
home.get("/", _homeController.homeController.index);

// vista para la pagina por genero
home.get("/genero", _homeController.homeController.genero);
var _default = home;
exports["default"] = _default;