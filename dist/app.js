"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _ejs = _interopRequireDefault(require("ejs"));
var _path = _interopRequireDefault(require("path"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var url = _interopRequireWildcard(require("url"));
var _homeRoutes = _interopRequireDefault(require("./routes/home.routes.js"));
var _loginRoutes = _interopRequireDefault(require("./routes/login.routes.js"));
var _userRoutes = _interopRequireDefault(require("./routes/user.routes.js"));
var _adminRoutes = _interopRequireDefault(require("./routes/admin.routes.js"));
var _bookRoutes = _interopRequireDefault(require("./routes/book.routes.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//* Imports de rutas

var _filename = url.fileURLToPath(import.meta.url);
var _dirname = url.fileURLToPath(new URL(".", import.meta.url));
_dotenv["default"].config();
var app = (0, _express["default"])();

//* CONFIGURATION
app.set("port", process.env.PORT || 9999);
app.set("views", _path["default"].join(_dirname, "views"));
app.set("view engine", "ejs");

//* MIDDLEWARE
app.use(_express["default"].json());
app.use("/assets", _express["default"]["static"](_dirname + "../public"));
app.use((0, _cookieParser["default"])());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));

//* ROUTES
app.use("/", _homeRoutes["default"]);
app.use("/", _loginRoutes["default"]);
app.use("/user", _userRoutes["default"]);
app.use("/admin", _adminRoutes["default"]);
app.use("/libro", _bookRoutes["default"]);

// Ruta por defecto al ingresar una ruta desconocida
app.use(function (req, res) {
  res.render("404.ejs");
});
var _default = app;
exports["default"] = _default;