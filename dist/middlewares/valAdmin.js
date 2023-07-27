"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateAdmin = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var validateAdmin = function validateAdmin(req, res, next) {
  try {
    var token = _jsonwebtoken["default"].verify(req.cookies.cookieBG, process.env.SECRET_KEY);
    if (token.COD_ROL === 2) {
      next();
    } else {
      res.redirect("/");
    }
  } catch (error) {
    // console.error(error);
    res.redirect("/");
  }
};
exports.validateAdmin = validateAdmin;