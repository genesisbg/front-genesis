"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adminController = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _nodeFetch = _interopRequireDefault(require("node-fetch"));
var _pdfkit = _interopRequireDefault(require("pdfkit"));
require("pdfkit-table");
var _xlsx = _interopRequireDefault(require("xlsx"));
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var dash = function dash(req, res) {
  res.render("dash.ejs");
};
var actualizar = function actualizar(req, res) {
  var cod_usuario = req.query.cod;
  res.render("actualizarusuario.ejs", {
    cod: cod_usuario
  });
};
var update = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var cod_usuario, datosUsuario, url, option;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          cod_usuario = req.query.cod;
          if (!cod_usuario) {
            _context.next = 19;
            break;
          }
          datosUsuario = {
            "NOM_USUARIO": req.body.NOM_USUARIO,
            "APELL_USUARIO": req.body.APELL_USUARIO,
            "CORREO": req.body.CORREO_USUARIO,
            "CONTRASENA": req.body.PASSWORD,
            "FECHA_NAC": req.body.FECHA_NACIMIENTO,
            "SEXO": req.body.sexo,
            "ESTADO": "ACTIVO",
            "COD_ROL": req.body.rol
          };
          if (!(datosUsuario.NOM_USUARIO && datosUsuario.APELL_USUARIO && datosUsuario.CORREO && datosUsuario.CONTRASENA && datosUsuario.FECHA_NAC && datosUsuario.SEXO && datosUsuario.ESTADO && datosUsuario.COD_ROL)) {
            _context.next = 16;
            break;
          }
          _context.prev = 4;
          url = "http://localhost:3000/api/user/".concat(cod_usuario);
          option = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(datosUsuario)
          };
          _context.next = 9;
          return (0, _nodeFetch["default"])(url, option).then(function (response) {
            return response.json();
          }).then(function (resActualiar) {
            console.log(resActualiar);

            // if (resActualiar.message === "Usuario añadido") { // El usuario se registrò correctamente
            //   return res.redirect("/admin/usuarios?alert=1")
            // } else if (resActualiar.message === "El DNI ingresado ya existe") { // El usuario ingreso un documento que ya se encuentro registrado
            //   return res.redirect("/admin/usuarios?alert=2")
            // }
          });
        case 9:
          _context.next = 14;
          break;
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](4);
          console.log(_context.t0);
        case 14:
          _context.next = 17;
          break;
        case 16:
          return _context.abrupt("return", res.redirect("/admin/usuarios?alert=0"));
        case 17:
          _context.next = 20;
          break;
        case 19:
          res.redirect("/admin/usuarios?alert=0");
        case 20:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[4, 11]]);
  }));
  return function update(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var actualizarLibro = function actualizarLibro(req, res) {
  res.render("actualizarLibro.ejs");
};
var devolucion = function devolucion(req, res) {
  res.render("devolucion.ejs");
};
var dashUsuarios = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var alertCase, url, option, datosUsuarios;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          alertCase = req.query.alert;
          _context2.prev = 1;
          url = "http://localhost:3000/api/user";
          option = {
            method: "GET"
          };
          datosUsuarios = {};
          _context2.next = 7;
          return (0, _nodeFetch["default"])(url, option).then(function (response) {
            return response.json();
          }).then(function (datosU) {
            datosUsuarios = datosU;
            // console.log(datosUsuarios);
          });
        case 7:
          if (!alertCase) {
            _context2.next = 21;
            break;
          }
          _context2.t0 = alertCase;
          _context2.next = _context2.t0 === "0" ? 11 : _context2.t0 === "1" ? 13 : _context2.t0 === "2" ? 15 : 17;
          break;
        case 11:
          res.render("dashusuarios", {
            alertCase: alertCase,
            usuarios: datosUsuarios
          });
          // res.render("login")
          return _context2.abrupt("break", 19);
        case 13:
          res.render("dashusuarios", {
            alertCase: alertCase,
            usuarios: datosUsuarios
          });
          return _context2.abrupt("break", 19);
        case 15:
          res.render("dashusuarios", {
            alertCase: alertCase,
            usuarios: datosUsuarios
          });
          return _context2.abrupt("break", 19);
        case 17:
          res.render("dashusuarios", {
            alertCase: alertCase,
            usuarios: datosUsuarios
          });
          return _context2.abrupt("break", 19);
        case 19:
          _context2.next = 22;
          break;
        case 21:
          res.render("dashusuarios.ejs", {
            alertCase: alertCase,
            usuarios: datosUsuarios
          });
        case 22:
          _context2.next = 27;
          break;
        case 24:
          _context2.prev = 24;
          _context2.t1 = _context2["catch"](1);
          console.error(_context2.t1);
        case 27:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 24]]);
  }));
  return function dashUsuarios(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var insertarUsuario = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var datosUsuario, url, option;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (!req.body.COD_USUARIO) {
            _context3.next = 16;
            break;
          }
          datosUsuario = {
            "DNI_USUARIO": req.body.COD_USUARIO,
            "NOM_USUARIO": req.body.NOM_USUARIO,
            "APELL_USUARIO": req.body.APELL_USUARIO,
            "CORREO": req.body.CORREO_USUARIO,
            "CONTRASENA": req.body.PASSWORD,
            "FECHA_NAC": req.body.FECHA_NACIMIENTO,
            "SEXO": req.body.sexo,
            "ESTADO": "ACTIVO",
            "COD_ROL": req.body.rol
          };
          if (!(datosUsuario.DNI_USUARIO && datosUsuario.NOM_USUARIO && datosUsuario.APELL_USUARIO && datosUsuario.CORREO && datosUsuario.CONTRASENA && datosUsuario.FECHA_NAC && datosUsuario.SEXO && datosUsuario.ESTADO && datosUsuario.COD_ROL)) {
            _context3.next = 15;
            break;
          }
          _context3.prev = 3;
          url = 'http://localhost:3000/api/user';
          option = {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(datosUsuario)
          };
          _context3.next = 8;
          return (0, _nodeFetch["default"])(url, option).then(function (response) {
            return response.json();
          }).then(function (resRegistro) {
            if (resRegistro.message === "Usuario añadido") {
              // El usuario se registrò correctamente
              return res.redirect("/admin/usuarios?alert=1");
            } else if (resRegistro.message === "El DNI ingresado ya existe") {
              // El usuario ingreso un documento que ya se encuentro registrado
              return res.redirect("/admin/usuarios?alert=2");
            }
          });
        case 8:
          _context3.next = 13;
          break;
        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](3);
          console.log(_context3.t0);
        case 13:
          _context3.next = 16;
          break;
        case 15:
          return _context3.abrupt("return", res.redirect("/admin/usuarios?alert=0"));
        case 16:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[3, 10]]);
  }));
  return function insertarUsuario(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var banUsuario = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var id, state, banData, url, option;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          id = req.query.id;
          state = req.query.state;
          banData = {};
          if (!(state && id)) {
            _context4.next = 25;
            break;
          }
          _context4.t0 = state;
          _context4.next = _context4.t0 === "ACTIVO" ? 7 : _context4.t0 === "INACTIVO" ? 9 : 11;
          break;
        case 7:
          banData = {
            "ESTADO": "INACTIVO"
          };
          return _context4.abrupt("break", 13);
        case 9:
          banData = {
            "ESTADO": "ACTIVO"
          };
          return _context4.abrupt("break", 13);
        case 11:
          banData = {
            "ESTADO": "INACTIVO"
          };
          return _context4.abrupt("break", 13);
        case 13:
          _context4.prev = 13;
          url = "http://localhost:3000/api/user/".concat(id);
          option = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(banData)
          };
          _context4.next = 18;
          return (0, _nodeFetch["default"])(url, option).then(function (response) {
            return response.json();
          }).then(function (resBan) {
            console.log(resBan);
            if (resBan.message === 'Estado del usuario actualizado') {
              res.redirect('usuarios');
            } else {
              res.redirect('usuarios');
            }
          });
        case 18:
          _context4.next = 23;
          break;
        case 20:
          _context4.prev = 20;
          _context4.t1 = _context4["catch"](13);
          console.error(_context4.t1);
        case 23:
          _context4.next = 26;
          break;
        case 25:
          res.redirect('usuarios');
        case 26:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[13, 20]]);
  }));
  return function banUsuario(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var dashLibros = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var alertCase, url, option, datosLibros;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          alertCase = req.query.alert;
          _context5.prev = 1;
          url = "http://localhost:3000/api/books";
          option = {
            method: "GET"
          };
          datosLibros = {};
          _context5.next = 7;
          return (0, _nodeFetch["default"])(url, option).then(function (response) {
            return response.json();
          }).then(function (datosL) {
            datosLibros = datosL;
            console.log(datosLibros);
          });
        case 7:
          if (!alertCase) {
            _context5.next = 21;
            break;
          }
          _context5.t0 = alertCase;
          _context5.next = _context5.t0 === "0" ? 11 : _context5.t0 === "1" ? 13 : _context5.t0 === "2" ? 15 : 17;
          break;
        case 11:
          res.render("dashlibros", {
            alertCase: alertCase,
            libros: datosLibros
          });
          // res.render("login")
          return _context5.abrupt("break", 19);
        case 13:
          res.render("dashlibros", {
            alertCase: alertCase,
            libros: datosLibros
          });
          return _context5.abrupt("break", 19);
        case 15:
          res.render("dashlibros", {
            alertCase: alertCase,
            libros: datosLibros
          });
          return _context5.abrupt("break", 19);
        case 17:
          res.render("dashlibros", {
            alertCase: alertCase,
            libros: datosLibros
          });
          return _context5.abrupt("break", 19);
        case 19:
          _context5.next = 22;
          break;
        case 21:
          res.render("dashlibros", {
            alertCase: alertCase,
            libros: datosLibros
          });
        case 22:
          _context5.next = 27;
          break;
        case 24:
          _context5.prev = 24;
          _context5.t1 = _context5["catch"](1);
          console.error(_context5.t1);
        case 27:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 24]]);
  }));
  return function dashLibros(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var insertarLibros = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var datosLibro, url, option;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          if (!true) {
            _context6.next = 19;
            break;
          }
          console.log("Im here 2");
          console.log(req.body);
          datosLibro = {
            "SIPNOPSIS": req.body.SIPNOPSIS,
            "TITULO": req.body.TITULO,
            "FECHA_PUBLICACION": req.body.FECHA_PUBLICACION,
            "NUM_SERIE": req.body.NUM_SERIE,
            "EDITORIAL": req.body.EDITORIAL,
            "COD_GENERO": req.body.COD_GENERO,
            "NOM_AUTOR": req.body.NOM_AUTOR
          };
          if (!(datosLibro.SIPNOPSIS && datosLibro.TITULO && datosLibro.FECHA_PUBLICACION && datosLibro.NUM_SERIE && datosLibro.EDITORIAL && datosLibro.COD_GENERO && datosLibro.NOM_AUTOR)) {
            _context6.next = 17;
            break;
          }
          _context6.prev = 5;
          url = 'http://localhost:3000/api/books';
          option = {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(datosLibro)
          };
          _context6.next = 10;
          return (0, _nodeFetch["default"])(url, option).then(function (response) {
            return response.json();
          }).then(function (resRegistro) {
            console.log(resRegistro);
            res.redirect('/admin/libros');
            // if (resRegistro.message === "Usuario añadido") { // El usuario se registrò correctamente
            //   return res.redirect("/admin/usuarios?alert=1")
            // } else if (resRegistro.message === "El DNI ingresado ya existe") { // El usuario ingreso un documento que ya se encuentro registrado
            //   return res.redirect("/admin/usuarios?alert=2")
            // }
          });
        case 10:
          _context6.next = 15;
          break;
        case 12:
          _context6.prev = 12;
          _context6.t0 = _context6["catch"](5);
          console.log(_context6.t0);
        case 15:
          _context6.next = 19;
          break;
        case 17:
          return _context6.abrupt("return", res.redirect("/admin/libros"));
        case 19:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[5, 12]]);
  }));
  return function insertarLibros(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var editarLibros = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var datosLibro, url, option;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          if (!req.body.COD_LIBRO) {
            _context7.next = 17;
            break;
          }
          datosLibro = {
            "SIPNOPSIS": req.body.SIPNOPSIS,
            "TITULO": req.body.TITULO,
            "FECHA_PUBLICACION": req.body.FECHA_PUBLICACION,
            "NUM_SERIE": req.body.NUM_SERIE,
            "EDITORIAL": req.body.EDITORIAL,
            "GENERO": req.body.COD_GENERO,
            "NOM_AUTOR": req.body.NOM_AUTOR,
            "IMAGEN": req.body.IMAGEN
          };
          if (!(datosLibro.SIPNOPSIS && datosLibro.TITULO && datosLibro.FECHA_PUBLICACION && datosLibro.NUM_SERIE && datosLibro.EDITORIAL && datosLibro.GENERO && datosLibro.NOM_AUTOR && datosLibro.IMAGEN)) {
            _context7.next = 15;
            break;
          }
          _context7.prev = 3;
          url = "http://localhost:3000/api/books/".concat(COD_LIBRO); // URL del libro específico a actualizar
          option = {
            method: "PUT",
            // Método HTTP PUT para actualizar el libro
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(datosLibro)
          };
          _context7.next = 8;
          return (0, _nodeFetch["default"])(url, option).then(function (response) {
            return response.json();
          }).then(function (resRegistro) {
            // Realizar acciones según la respuesta del servidor
            // Redirigir a una página específica después de la actualización
            res.redirect("holacion");
          });
        case 8:
          _context7.next = 13;
          break;
        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](3);
          console.log(_context7.t0);
        case 13:
          _context7.next = 17;
          break;
        case 15:
          return _context7.abrupt("return", res.redirect("/admin/libros"));
        case 17:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[3, 10]]);
  }));
  return function editarLibros(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
var eliminarLibros = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var id, url, option, result;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          id = req.query.id;
          url = "http://localhost:3000/api/books/".concat(id);
          option = {
            method: "DELETE"
          };
          _context8.next = 5;
          return (0, _nodeFetch["default"])(url, option).then(function (response) {
            return response.json();
          }).then(function (data) {
            if (data.affectedRows == 1) {
              console.log("borrado");
            } else {
              console.log("NO BORRADO");
            }
          });
        case 5:
          result = _context8.sent;
          return _context8.abrupt("return", res.redirect("/admin/libros"));
        case 7:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function eliminarLibros(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
var dashPrestamos = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var url, option, dataPrestamo;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          url = "http://localhost:3000/api/loan-header";
          option = {
            method: "GET"
          };
          dataPrestamo = {};
          _context9.next = 6;
          return (0, _nodeFetch["default"])(url, option).then(function (response) {
            return response.json();
          }).then(function (datosP) {
            dataPrestamo = datosP;
          });
        case 6:
          res.render("dashprestamos", {
            prestamos: dataPrestamo
          });
          _context9.next = 12;
          break;
        case 9:
          _context9.prev = 9;
          _context9.t0 = _context9["catch"](0);
          res.status(500).send(_context9.t0.message);
        case 12:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 9]]);
  }));
  return function dashPrestamos(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
var eliminarPrestamos = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var id, url, option, result;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          id = req.query.id;
          url = "http://localhost:3000/api/loan-header/".concat(id);
          option = {
            method: "DELETE"
          };
          _context10.next = 5;
          return (0, _nodeFetch["default"])(url, option).then(function (response) {
            return response.json();
          }).then(function (data) {
            if (data.affectedRows == 1) {
              console.log("borrado");
            } else {
              console.log("NO BORRADO");
            }
          });
        case 5:
          result = _context10.sent;
          return _context10.abrupt("return", res.redirect("/admin/prestamos"));
        case 7:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return function eliminarPrestamos(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();
var getUser = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
    var response, user;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return (0, _nodeFetch["default"])("http://localhost:3000/api/user");
        case 3:
          response = _context11.sent;
          _context11.next = 6;
          return response.json();
        case 6:
          user = _context11.sent;
          return _context11.abrupt("return", user);
        case 10:
          _context11.prev = 10;
          _context11.t0 = _context11["catch"](0);
          throw new Error("Error al obtener los datos de usuario: " + _context11.t0.message);
        case 13:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 10]]);
  }));
  return function getUser() {
    return _ref11.apply(this, arguments);
  };
}();
var pdf = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var users, doc, logoPath, logoImage, currentDate, currentTime, token;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return getUser();
        case 3:
          users = _context12.sent;
          // Función para obtener los productos de la API
          // Crear un nuevo documento PDF
          doc = new _pdfkit["default"]();
          logoPath = 'public/img/ole.png'; // Reemplaza con la ruta adecuada de tu archivo de imagen
          logoImage = _fs["default"].readFileSync(logoPath); // Establecer encabezado
          doc.image(logoImage, {
            fit: [100, 100],
            // Tamaño del logo en el PDF
            align: 'center',
            // Alineación del logo en el PDF
            valign: 'top' // Alineación vertical del logo en el PDF
          });

          doc.font("Helvetica-Bold").fontSize(18).text("Reporte de Usuarios", {
            align: "center"
          });

          // Establecer la fecha actual
          currentDate = new Date().toLocaleDateString();
          currentTime = new Date().toLocaleTimeString();
          doc.fontSize(12).text("Fecha de creaci\xF3n del reporte: ".concat(currentDate, "- ").concat(currentTime), {
            align: "center",
            margin: [0, 20]
          });
          token = _jsonwebtoken["default"].verify(req.cookies.cookieBG, process.env.SECRET_KEY);
          doc.fontSize(12).text(token.NOM_USUARIO, {
            align: "center"
          });
          // Generar tabla de usuarios
          generatePDFTable(doc, users);

          // Establecer el nombre del archivo y el tipo de contenido de la respuesta
          res.setHeader("Content-Disposition", "attachment; filename=reporte_usuarios.pdf");
          res.setHeader("Content-Type", "application/pdf");

          // Envía el documento PDF como respuesta
          doc.pipe(res);
          doc.end();
          _context12.next = 25;
          break;
        case 21:
          _context12.prev = 21;
          _context12.t0 = _context12["catch"](0);
          res.status(500).send(_context12.t0.message);
          console.log(_context12.t0.message);
        case 25:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 21]]);
  }));
  return function pdf(_x21, _x22) {
    return _ref12.apply(this, arguments);
  };
}();
var generatePDFTable = function generatePDFTable(doc, users) {
  var rolText = {
    1: 'Usuario',
    2: 'Administrador'
  };
  var tableHeaders = ["ID", "Nombre", "Apellido", "estado", "Rol"];

  // Establecer posición inicial de la tabla
  var y = doc.y + 30;

  // Establecer estilos para los encabezados de la tabla
  doc.font("Helvetica-Bold").fontSize(10);
  doc.fillColor("black");

  // Dibujar los encabezados de la tabla
  tableHeaders.forEach(function (header, columnIndex) {
    doc.text(header, columnIndex * 100 + 50, y);
  });
  if (users && Array.isArray(users)) {
    // Establecer estilos para las filas de la tabla
    doc.font("Helvetica").fontSize(10);

    // Dibujar las filas de la tabla
    users.forEach(function (user, rowIndex) {
      // Cambiar el nombre de la variable 'user' en el bucle
      y += 20; // Aumentar la posición vertical para cada fila

      var rowData = [user.DNI_USUARIO, user.NOM_USUARIO, user.APELL_USUARIO, user.ESTADO, rolText[user.COD_ROL]];
      rowData.forEach(function (data, columnIndex) {
        var cellWidth = 100;
        var cellHeight = 20;
        var textOptions = {
          width: cellWidth,
          height: cellHeight,
          lineBreak: false
        };
        doc.text(data, columnIndex * 100 + 50, y, textOptions);
      });
    });
  }
};

/**
 * Genera un reporte en formato Excel de los productos obtenidos de la API.
 * El reporte se genera en un archivo de Excel y se descarga como adjunto en la respuesta HTTP.
 */
var excel = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var user, workbook, worksheet, excelBuffer;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return getUser();
        case 3:
          user = _context13.sent;
          // Función para obtener los productos de la API
          // Crear una nueva hoja de cálculo
          workbook = _xlsx["default"].utils.book_new(); // Crear una nueva hoja dentro del libro de Excel
          worksheet = _xlsx["default"].utils.json_to_sheet(user); // Agregar la hoja al libro de Excel
          _xlsx["default"].utils.book_append_sheet(workbook, worksheet, "Usuarios");

          // Convertir el libro de Excel a un archivo de buffer
          excelBuffer = _xlsx["default"].write(workbook, {
            bookType: "xlsx",
            type: "buffer"
          }); // Establecer el nombre del archivo y el tipo de contenido de la respuesta
          res.setHeader("Content-Disposition", "attachment; filename=reporte_usuarios.xlsx");
          res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

          // Envía el archivo de Excel como respuesta
          res.send(excelBuffer);
          _context13.next = 17;
          break;
        case 13:
          _context13.prev = 13;
          _context13.t0 = _context13["catch"](0);
          res.status(500).send(_context13.t0.message);
          console.log(_context13.t0.message);
        case 17:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 13]]);
  }));
  return function excel(_x23, _x24) {
    return _ref13.apply(this, arguments);
  };
}();
var getPrestamo = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14() {
    var response, presta;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          _context14.next = 3;
          return (0, _nodeFetch["default"])("http://localhost:3000/api/loan-header");
        case 3:
          response = _context14.sent;
          _context14.next = 6;
          return response.json();
        case 6:
          presta = _context14.sent;
          return _context14.abrupt("return", presta);
        case 10:
          _context14.prev = 10;
          _context14.t0 = _context14["catch"](0);
          throw new Error("Error al obtener los datos de usuario: " + _context14.t0.message);
        case 13:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 10]]);
  }));
  return function getPrestamo() {
    return _ref14.apply(this, arguments);
  };
}();
var pdfPrestamo = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, res) {
    var prestam, doc, logoPath, logoImage, currentDate, currentTime, token;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _context15.next = 3;
          return getPrestamo();
        case 3:
          prestam = _context15.sent;
          // Función para obtener los productos de la API
          // Crear un nuevo documento PDF
          doc = new _pdfkit["default"]();
          logoPath = 'public/img/ole.png'; // Reemplaza con la ruta adecuada de tu archivo de imagen
          logoImage = _fs["default"].readFileSync(logoPath); // Establecer encabezado
          doc.image(logoImage, {
            fit: [100, 100],
            // Tamaño del logo en el PDF
            align: 'center',
            // Alineación del logo en el PDF
            valign: 'top' // Alineación vertical del logo en el PDF
          });

          doc.font("Helvetica-Bold").fontSize(18).text("Reporte de Prestamos", {
            align: "center"
          });

          // Establecer la fecha actual
          currentDate = new Date().toLocaleDateString();
          currentTime = new Date().toLocaleTimeString();
          doc.fontSize(12).text("Fecha de creaci\xF3n del reporte: ".concat(currentDate, "- ").concat(currentTime), {
            align: "center",
            margin: [0, 20]
          });
          token = _jsonwebtoken["default"].verify(req.cookies.cookieBG, process.env.SECRET_KEY);
          doc.fontSize(12).text(token.NOM_USUARIO, {
            align: "center"
          });
          // Generar tabla de usuarios
          generatePDFTableP(doc, prestam);

          // Establecer el nombre del archivo y el tipo de contenido de la respuesta
          res.setHeader("Content-Disposition", "attachment; filename=reporte_prestamos.pdf");
          res.setHeader("Content-Type", "application/pdf");

          // Envía el documento PDF como respuesta
          doc.pipe(res);
          doc.end();
          _context15.next = 25;
          break;
        case 21:
          _context15.prev = 21;
          _context15.t0 = _context15["catch"](0);
          res.status(500).send(_context15.t0.message);
          console.log(_context15.t0.message);
        case 25:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[0, 21]]);
  }));
  return function pdfPrestamo(_x25, _x26) {
    return _ref15.apply(this, arguments);
  };
}();
var generatePDFTableP = function generatePDFTableP(doc, prestam) {
  var estadoText = {
    0: 'Devuelto',
    1: 'No devuelto'
  };
  var tableHeaders = ["Codigo Prestamo", "Fecha prestamo", "Fecha devolucion", "estado", "Usuario"];

  // Establecer posición inicial de la tabla
  var y = doc.y + 30;

  // Establecer estilos para los encabezados de la tabla
  doc.font("Helvetica-Bold").fontSize(10);
  doc.fillColor("black");

  // Dibujar los encabezados de la tabla
  tableHeaders.forEach(function (header, columnIndex) {
    doc.text(header, columnIndex * 100 + 50, y);
  });
  if (prestam && Array.isArray(prestam)) {
    // Establecer estilos para las filas de la tabla
    doc.font("Helvetica").fontSize(10);

    // Dibujar las filas de la tabla
    prestam.forEach(function (prestamo, rowIndex) {
      // Cambiar el nombre de la variable 'user' en el bucle
      y += 20; // Aumentar la posición vertical para cada fila

      var rowData = [prestamo.COD_ENC_PRESTAMO, prestamo.FECHA_PRESTAMO, prestamo.FECHA_DEVOLUCION, estadoText[prestamo.ESTADO], prestamo.DNI_USUARIO];
      rowData.forEach(function (data, columnIndex) {
        var cellWidth = 100;
        var cellHeight = 20;
        var textOptions = {
          width: cellWidth,
          height: cellHeight,
          lineBreak: false
        };
        doc.text(data, columnIndex * 100 + 50, y, textOptions);
      });
    });
  }
};
var excelP = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req, res) {
    var prestamos, workbook, worksheet, excelBuffer;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          _context16.next = 3;
          return getPrestamo();
        case 3:
          prestamos = _context16.sent;
          // Función para obtener los productos de la API
          // Crear una nueva hoja de cálculo
          workbook = _xlsx["default"].utils.book_new(); // Crear una nueva hoja dentro del libro de Excel
          worksheet = _xlsx["default"].utils.json_to_sheet(prestamos); // Agregar la hoja al libro de Excel
          _xlsx["default"].utils.book_append_sheet(workbook, worksheet, "Prestamos");

          // Convertir el libro de Excel a un archivo de buffer
          excelBuffer = _xlsx["default"].write(workbook, {
            bookType: "xlsx",
            type: "buffer"
          }); // Establecer el nombre del archivo y el tipo de contenido de la respuesta
          res.setHeader("Content-Disposition", "attachment; filename=reporte_Prestamos.xlsx");
          res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

          // Envía el archivo de Excel como respuesta
          res.send(excelBuffer);
          _context16.next = 17;
          break;
        case 13:
          _context16.prev = 13;
          _context16.t0 = _context16["catch"](0);
          res.status(500).send(_context16.t0.message);
          console.log(_context16.t0.message);
        case 17:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[0, 13]]);
  }));
  return function excelP(_x27, _x28) {
    return _ref16.apply(this, arguments);
  };
}();
var adminController = {
  dash: dash,
  actualizar: actualizar,
  update: update,
  actualizarLibro: actualizarLibro,
  devolucion: devolucion,
  dashUsuarios: dashUsuarios,
  dashLibros: dashLibros,
  dashPrestamos: dashPrestamos,
  insertarUsuario: insertarUsuario,
  banUsuario: banUsuario,
  eliminarLibros: eliminarLibros,
  eliminarPrestamos: eliminarPrestamos,
  insertarLibros: insertarLibros,
  editarLibros: editarLibros,
  pdf: pdf,
  excel: excel,
  pdfPrestamo: pdfPrestamo,
  excelP: excelP
};
exports.adminController = adminController;