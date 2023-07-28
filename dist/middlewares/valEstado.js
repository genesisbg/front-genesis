"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateState = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var validateState = function validateState(req, res, next) {
  try {
    var token = _jsonwebtoken["default"].verify(req.cookies.cookieBG, process.env.SECRET_KEY);
    if (token.ESTADO === "ACTIVO") {
      next();
    } else {
      res.redirect("/logout?alert=5");
    }
  } catch (error) {
    // console.error(error);
    res.redirect("/logout?alert=5");
  }
};
exports.validateState = validateState;