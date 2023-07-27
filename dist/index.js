"use strict";

var _app = _interopRequireDefault(require("./app.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_app["default"].listen(_app["default"].get("port"), function () {
  console.table({
    MESSAGE: "Ejecutando...",
    PORT: _app["default"].get("port"),
    URL: "http://localhost:".concat(_app["default"].get("port"))
  });
});