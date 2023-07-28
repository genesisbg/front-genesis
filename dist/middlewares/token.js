"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var validateToken = function validateToken(req, res, next) {
  try {
    var token = _jsonwebtoken["default"].verify(req.cookies.cookieBG, process.env.SECRET_KEY);
    if (token) {
      next();
    } else {
      res.redirect("/");
    }
  } catch (error) {
    res.redirect("/");
  }
};
exports.validateToken = validateToken;